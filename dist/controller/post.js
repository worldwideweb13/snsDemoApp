"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeLinePost = exports.likePost = exports.getPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
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
// 投稿の削除
const deletePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.postId);
        if (post &&
            post.userId ===
                req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました！");
        }
        else {
            return res.status(403).json("他の人の投稿を削除することはできません");
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.deletePost = deletePost;
// 特定の投稿を取得する
const getPost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.postId);
        if (post) {
            return res.status(200).json(post);
        }
        else {
            return res.status(403).json("投稿が存在しません");
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.getPost = getPost;
// 投稿のいいねボタン機能
const likePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.postId);
        // まだ投稿にいいねが押されていなかったらいいねを押せる
        if (post && !post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("投稿にいいねを押しました！");
        }
        else {
            // いいねをしているユーザーIDを取り除く
            await (post === null || post === void 0 ? void 0 : post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            }));
            return res.status(200).json("いいねを解除しました！");
        }
    }
    catch (err) {
        res.json(400).json(err);
    }
};
exports.likePost = likePost;
// タイムラインの投稿を取得
const timeLinePost = async (req, res) => {
    try {
        const currentUser = await User_1.default.findById(req.body.userId);
        const userPosts = await Post_1.default.find({ userId: currentUser._id });
        // 友達の投稿内容を取得する
        if (currentUser.followings) {
            const friendPosts = await Promise.all(
            /*
             map()関数を使いfollowing配列からIdを一件ずつ取り出して、ID毎の投稿一覧の配列を作成する
             concat()...mongoose関数でオブジェクト結合を行う
             friendPostsの構造は{{投稿1,投稿2...},{}}になっているのでスプレッド構文で展開
            */
            currentUser.followings.map((friendId) => {
                return Post_1.default.find({ userId: friendId });
            }));
            return res.status(200).json(userPosts.concat(...friendPosts));
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.timeLinePost = timeLinePost;
