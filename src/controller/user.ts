import { RequestHandler } from "express";
import User from "../models/User";

export const updateUser: RequestHandler<{ id: string }> = async (req, res) => {
  if (
    (req.body as { userId: string }).userId === req.params.id ||
    (req.body as { isAdmin: Boolean }).isAdmin
  ) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        //$set...req.bodyの要素に全て置き換える
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます");
  }
};

// ユーザー情報の削除
export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
  if (
    (req.body as { userId: string }).userId === req.params.id ||
    (req.body as { isAdmin: Boolean }).isAdmin
  ) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を削除できます");
  }
};

// ユーザー情報の取得
export const getUser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user!._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ユーザーのフォロー
export const followUser: RequestHandler<{ id: string }> = async (req, res) => {
  //自分自身はフォローできないため、フォロー対象ユーザidと自身のuserIdを比較.
  if ((req.body as { userId: string }).userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(
        (req.body as { userId: string }).userId
      );
      /* 
        フォローするアカウントのフォロワーに自分がいなかったらフォローができる
        followers.includes()...includes(id)で配列から引数に一致する検索、ない場合はfalse
        followersは配列なのでincludes()を利用可
      */
      if (
        currentUser &&
        user &&
        user.followers &&
        !user.followers.includes((req.body as { userId: string }).userId)
      ) {
        // フォローされたアカウントのフォロワー一覧に追加
        await user.updateOne({
          $push: {
            followers: (req.body as { userId: string }).userId,
          },
        });
        // 自分のアカウントのフォロー一覧に追加する
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォローに成功しました！");
      } else {
        return res
          .status(403)
          .json("あなたは既にこのユーザーをフォローしています");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
};

// ユーザーのフォロー解除
export const unFollowUser: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  //自分自身はフォローできないため、フォロー対象ユーザidと自身のuserIdを比較.
  if ((req.body as { userId: string }).userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(
        (req.body as { userId: string }).userId
      );
      /* 
     フォロー解除するアカウントのフォロワーに自分がいたらフォロー解除
     followers.includes()...includes(id)で配列から引数に一致する検索、ない場合はfalse
     followersは配列なのでincludes()を利用可
    */
      if (
        currentUser &&
        user &&
        user.followers &&
        user.followers.includes((req.body as { userId: string }).userId)
      ) {
        // フォローされたアカウントのフォロワー一覧から削除
        await user.updateOne({
          $pull: {
            followers: (req.body as { userId: string }).userId,
          },
        });
        // 自分のアカウントのフォロー一覧から削除
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォロー解除しました！");
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません");
  }
};


