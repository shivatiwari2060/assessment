import express from "express";
const authRoute = express.Router();
import authController from "../controller/AuthController.js";
import userAuth from "../middleware/UserAuth.js";

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
export default authRoute;
