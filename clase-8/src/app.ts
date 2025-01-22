
import express from "express";
import { connectDB } from "./config/mongoDB.config";
import routes from "./routes/index";
import cors from "cors";
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server on port 8080");
})