import { Router } from "express";
import { createPost, updatePost } from "../controller/post";
const router = Router();

//投稿を作成する
router.post("/", createPost);
router.put("/:postId", updatePost);
export default router;
