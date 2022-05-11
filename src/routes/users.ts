import { Router, RequestHandler } from "express";
import { updateUser, deleteUser, getUser, followUser } from "../controller/user";

const router = Router();

// CRUD
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put('/:id/follow', followUser)

export default router;
