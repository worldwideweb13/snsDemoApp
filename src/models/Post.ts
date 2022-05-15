import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface MongoResult {
  _doc: any;
}

export interface IPostSchema extends Document, MongoResult {
  userId: String;
  desc: String;
  img: String;
  likes: {};
  createdAt: string | Date;
  updatedAt: string | Date;
}

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model<IPostSchema>("Post", PostSchema);

export default Post;