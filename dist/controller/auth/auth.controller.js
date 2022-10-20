"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const index_1 = __importDefault(require("../../models/auth/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const newUser = new index_1.default({ username, email, password });
        newUser.password = yield newUser.encryptPassword(newUser.password);
        const savedUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "tokentest");
        res.header("auth-token", token).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield index_1.default.findOne({ email });
    if (user == null)
        return res.status(400).json({ message: "Email is not found" });
    const validPassword = yield user.validatePassword(password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24,
    });
    res.header("auth-token", token).json(user);
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.default.findById(req.userId, { password: 0 });
    if (user == null)
        return res.status(400).json({ message: "User not found" });
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map