import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

export default validate;
