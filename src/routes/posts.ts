import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "../controller/post";
const router = Router();

//投稿を作成する
router.post("/", createPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);
router.get("/:postId", getPost);
export default router;
