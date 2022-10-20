import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../../libs/validateHelper";

export const signupValidator = [
  check("username", "Username is required")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check("email", "Please include a valid email").isEmail().isLength({ min: 6 }),
  check("password", "Please enter a password with 6 or more characters")
    .isEmpty()
    .isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const signinValidator = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  signupValidator,
  signinValidator,
};
