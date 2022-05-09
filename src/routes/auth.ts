import { Router } from "express";
const router = Router();

router.get("/", (_, res) => {
  res.send("auth router");
});

export default router;
