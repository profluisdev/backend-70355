import express from "express";
import "dotenv/config";
import { connectDB } from "./config/mongoDB.config.js";
import envsConfig from "./config/envs.config.js";
import routes from "./router/index.routes.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});
