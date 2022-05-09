import { Router } from "express";
const router = Router();

router.get("/", (_, res) => {
  res.send("posts router");
});

export default router;
