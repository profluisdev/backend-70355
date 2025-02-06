import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import { userDao } from "../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { cartDao } from "../dao/mongo/cart.dao.js";
import envsConfig from "./envs.config.js";
import { sendUserMail } from "../utils/sendEmail.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

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
        const { first_name, last_name, age, role } = req.body;
        // Verificamos si el usuario ya existe
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "El usuario ya existe" });

        const newCart = await cartDao.create();

        const newUser = {
          first_name,
          last_name,
          email: username,
          age,
          password: createHash(password),
          role,
          cart: newCart._id 
        };

        const createUser = await userDao.create(newUser);
        await sendUserMail(createUser);
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
        clientID: envsConfig.GOOGLE_CLIENT_ID,
        clientSecret: envsConfig.GOOGLE_CLIENT_SECRET,
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
          await sendUserMail(newUser);
          return cb(null, newUser);
        } catch (error) {
          cb(error);
        }
      }
    )
  );

  // Estrategia JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      { jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envsConfig.JWT_KEY },
      async (jwt_payload, done) => {
        try {
          const { email } = jwt_payload;
          const user = await userDao.getByEmail(email);
         
          done(null, user);
        } catch (error) {
          done(error);
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
