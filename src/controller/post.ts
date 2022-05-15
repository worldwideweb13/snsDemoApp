import { RequestHandler } from "express";
import Post from "../models/Post";
import User from "../models/User";

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

// 投稿のいいねボタン機能
export const likePost: RequestHandler<{ postId: String }> = async (
  req,
  res
) => {
  try {
    const post = await Post.findById(req.params.postId);
    // まだ投稿にいいねが押されていなかったらいいねを押せる
    if (post && !post.likes.includes((req.body as { userId: String }).userId)) {
      await post.updateOne({
        $push: {
          likes: (req.body as { userId: String }).userId,
        },
      });
      return res.status(200).json("投稿にいいねを押しました！");
    } else {
      // いいねをしているユーザーIDを取り除く
      await post?.updateOne({
        $pull: {
          likes: (req.body as { userId: String }).userId,
        },
      });
      return res.status(200).json("いいねを解除しました！");
    }
  } catch (err) {
    res.json(400).json(err);
  }
};

// タイムラインの投稿を取得
export const timeLinePost: RequestHandler = async (req, res) => {
  try {
    const currentUser = await User.findById(
      (req.body as { userId: String }).userId
    );
    const userPosts = await Post.find({ userId: currentUser!._id });
    // 友達の投稿内容を取得する
    if (currentUser!.followings) {
      const friendPosts = await Promise.all(
        /*
         map()関数を使いfollowing配列からIdを一件ずつ取り出して、ID毎の投稿一覧の配列を作成する
         concat()...mongoose関数でオブジェクト結合を行う
         friendPostsの構造は{{投稿1,投稿2...},{}}になっているのでスプレッド構文で展開
        */
        currentUser!.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      return res.status(200).json(userPosts.concat(...friendPosts));
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
