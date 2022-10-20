"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const validateHelper_1 = require("../../libs/validateHelper");
exports.signupValidator = [
    (0, express_validator_1.check)("username", "Username is required")
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail().isLength({ min: 6 }),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters")
        .isEmpty()
        .isLength({ min: 6 }),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    },
];
exports.signinValidator = [
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").exists(),
    (req, res, next) => {
        (0, validateHelper_1.validateResult)(req, res, next);
    },
];
module.exports = {
    signupValidator: exports.signupValidator,
    signinValidator: exports.signinValidator,
};
//# sourceMappingURL=index.js.map