import { RequestHandler } from "express";
import User from "../models/User";
// const User = require("../models/User");

export const registUser: RequestHandler = async (req, res) => {
  try {
    const newUser = await new User({
      username: (req.body as { username: string }).username,
      email: (req.body as { email: string }).email,
      password: (req.body as { password: string }).password,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
