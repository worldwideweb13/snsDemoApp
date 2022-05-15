"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
// CRUD
router.get("/:id", user_1.getUser);
router.put("/:id", user_1.updateUser);
router.delete("/:id", user_1.deleteUser);
// ユーザーのフォロー
router.put("/:id/follow", user_1.followUser);
// フォロー解除
router.put("/:id/unfollow", user_1.unFollowUser);
exports.default = router;
