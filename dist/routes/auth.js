"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
// ユーザー登録
router.post("/register", auth_1.registUser);
// router.get("/", (_, res) => {
//   res.send("auth router");
// });
exports.default = router;
