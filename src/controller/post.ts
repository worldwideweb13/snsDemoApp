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
