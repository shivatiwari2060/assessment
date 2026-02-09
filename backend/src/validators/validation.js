import { body } from "express-validator";
export const createSalesValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters")
    .escape(),

  body("amountSold")
    .notEmpty()
    .withMessage("Amount sold is required")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a number ≥ 0")
    .toFloat(),

  body("numberOfSales")
    .notEmpty()
    .withMessage("Number of sales is required")
    .isNumeric()
    .toInt(),
];
