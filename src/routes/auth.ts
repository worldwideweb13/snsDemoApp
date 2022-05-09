import { Router } from "express";
import { registUser } from "../controller/auth";

const router = Router();

// ユーザー登録
router.post("/register", registUser);

// router.get("/", (_, res) => {
//   res.send("auth router");
// });

export default router;
