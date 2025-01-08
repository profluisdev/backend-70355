import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { userDao } from "../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;

// Función global de estrategias
export const initializedPassport = () => {
  // Estrategia de registro local
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      /* 
    "register" es el nombre de la estrategia que estamos creando.
    passReqToCallback: true, nos permite acceder a la request en la función de autenticación.
    usernameField: "email", nos permite definir el campo que usaremos como username.
    Nota: passport recibe dos datos el username y el password, en caso de que no tengamos un campo username en nuestro formulario, podemos usar usernameField para definir el campo que usaremos como username.
    done es una función que debemos llamar cuando terminamos de procesar la autenticación.
    */

      try {
        const { first_name, last_name, age } = req.body;
        // Verificamos si el usuario ya existe
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "El usuario ya existe" });

        const newUser = {
          first_name,
          last_name,
          email: username,
          age,
          password: createHash(password),
        };

        const createUser = await userDao.create(newUser);

        done(null, createUser);
      } catch (error) {
        done(error);
      }
    })
  );

  // Estrategia de login
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userDao.getByEmail(username);
        const checkPass = isValidPassword(password, user);
        if (!user || !checkPass) return done(null, false, { message: "Email o password no válidos" });

        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  // Estrategia de google
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "1086173719015-3dml5ja0cgubvmkg7s5boa5vui9eal1v.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          const user = await userDao.getByEmail(emails[0].value);
          
          if (user) return cb(null, user);

          const newUser = await userDao.create({
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          });

          return cb(null, newUser);
        } catch (error) {
          cb(error);
        }
      }
    )
  );

  // Serialización y deserialización de usuarios
  /* 
  La serialización y deserialización de usuarios es un proceso que nos permite almacenar y recuperar información del usuario en la sesión.
  La serialización es el proceso de convertir un objeto de usuario en un identificador único.
  La deserialización es el proceso de recuperar un objeto de usuario a partir de un identificador único.
  Los datos del user se almacenan en la sesión y se recuperan en cada petición.
  */
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
