import { Router, RequestHandler } from "express";
import { updateUser, deleteUser, getUser } from "../controller/user";

const router = Router();

// CRUD
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
