import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import ConnectDB from "./src/DB/ConnectDB.js";
import saleRoute from "./src/routes/salesRoutes.js";
import authRoute from "./src/routes/AuthRoutes.js";
ConnectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/sale", saleRoute);
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.status(200).send("Server is running properly");
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running on ${PORT}`);
});
