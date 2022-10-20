"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controller/auth/auth.controller");
const validateToken_1 = require("../../libs/validateToken");
const index_1 = require("../../validator/auth/index");
const router = (0, express_1.Router)();
router.post("/signup", index_1.signupValidator, auth_controller_1.signup);
router.post("/signin", index_1.signinValidator, auth_controller_1.signin);
router.get("/profile", validateToken_1.tokenValidate, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=index.js.map