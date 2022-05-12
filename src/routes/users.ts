import { Router, RequestHandler } from "express";
import { updateUser, deleteUser, getUser, followUser, unFollowUser } from "../controller/user";

const router = Router();

// CRUD
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// ユーザーのフォロー
router.put('/:id/follow', followUser)
// フォロー解除
router.put('/:id/unfollow', unFollowUser)

export default router;
