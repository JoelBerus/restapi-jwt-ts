"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(process.env.MONGODB_URI || "mongodb://localhost/test"
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// }
)
    .then(db => console.log("DB is connected!!"))
    .catch(err => console.error(err));
//# sourceMappingURL=config.js.map