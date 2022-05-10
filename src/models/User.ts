import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: String;
  coverPicture?: String;
  followers?: String;
  followings?: String;
  isAdmin: boolean;
  desc?: String;
  city?: String;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 70,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
