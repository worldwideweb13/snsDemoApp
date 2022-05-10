import { RequestHandler } from "express";
import User, { IUser } from "../models/User";

export const registUser: RequestHandler = async (req, res) => {
  try {
    const newUser = await new User({
      username: (req.body as { username: string }).username,
      email: (req.body as { email: string }).email,
      password: (req.body as { password: string }).password,
    });
    const user: IUser = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ログイン
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const user: IUser = await User.findOne({
      email: (req.body as { email: string }).email,
    });
    if (!user) return res.status(404).send("ユーザーが見つかりません");
    // validPassword...passeordが一致すればtrue, else false
    const validPassword =
      (req.body as { password: string }).password === user.password;
    if (!validPassword) return res.status(400).json("パスワードが違います");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
