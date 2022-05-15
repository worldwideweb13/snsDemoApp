"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controller/post");
const router = (0, express_1.Router)();
//投稿を作成する
router.post("/", post_1.createPost);
router.put("/:postId", post_1.updatePost);
router.delete("/:postId", post_1.deletePost);
router.get("/:postId", post_1.getPost);
router.put("/:postId/like", post_1.likePost);
router.get("/timeline/all", post_1.timeLinePost);
exports.default = router;
