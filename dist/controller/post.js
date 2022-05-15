"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const createPost = async (req, res) => {
    const newPost = new Post_1.default(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.postId);
        if (post && post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿データを更新しました");
        }
        else {
            return res.status(403).json("あなたは他の人の投稿を編集できません");
        }
    }
    catch (err) {
        return res.status(403).json(err);
    }
};
exports.updatePost = updatePost;