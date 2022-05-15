import { RequestHandler } from "express";
import Post from "../models/Post";

export const createPost: RequestHandler = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePost: RequestHandler<{ postId: string }> = async (
  req,
  res
) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post && post.userId === (req.body as { userId: String }).userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿データを更新しました");
    } else {
      return res.status(403).json("あなたは他の人の投稿を編集できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
};

// 投稿の削除
export const deletePost: RequestHandler<{ postId: string }> = async (
  req,
  res
) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (
      post &&
      (post as { userId: String }).userId ===
        (req.body as { userId: String }).userId
    ) {
      await post.deleteOne();
      return res.status(200).json("投稿削除に成功しました！");
    } else {
      return res.status(403).json("他の人の投稿を削除することはできません");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

// 特定の投稿を取得する
export const getPost: RequestHandler<{ postId: String }> = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(403).json("投稿が存在しません");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
