import { Router } from "express";
import { loginUser, registUser } from "../controller/auth";

const router = Router();

// ユーザー登録
router.post("/register", registUser);

// ログイン
router.post("/login", loginUser);

export default router;
