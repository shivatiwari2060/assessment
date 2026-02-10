import express from "express";
import validate from "../middleware/validate.js";
import { createSalesValidation } from "../validators/validation.js";
import salesController from "../controller/SalesController.js";
import { authorizeRole } from "../middleware/AuthorizeRole.js";
import userAuth from "../middleware/UserAuth.js";
const saleRoute = express.Router();

saleRoute.post("/", createSalesValidation, validate, salesController.addSale);
saleRoute.get(
  "/leaderboard",
  userAuth,
  authorizeRole("leader"),
  salesController.leaderBoard
);

export default saleRoute;
