import { RequestHandler } from "express";
import User, { IUser } from "../models/User";

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
    const user: IUser = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
