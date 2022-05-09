"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
// データベース接続
mongoose_1.default
    .connect(process.env.MONGOURL)
    .then(() => {
    console.log("DBと接続中....");
})
    .catch((err) => {
    console.log(err);
});
//
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const PORT = 3000;
app.listen(PORT, () => console.log("サーバーが起動しました"));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/posts", posts_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
