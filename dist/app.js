"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/auth/index"));
const app = (0, express_1.default)();
// settings
app.set('port', 3000);
// app.set('port', process.env.PORT || 3000);
// middleware
// app.use(morgan('dev'));
app.use(express_1.default.json());
// router routes
app.use('/api/auth', index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map