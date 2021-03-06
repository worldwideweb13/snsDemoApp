import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import mongoose from "mongoose";
import { json } from "body-parser";

// データベース接続
mongoose
  .connect(process.env.MONGOURL!)
  .then(() => {
    console.log("DBと接続中....");
  })
  .catch((err) => {
    console.log(err);
  });

//
const app = express();
app.use(json());

const PORT = 3000;

app.listen(PORT, () => console.log("サーバーが起動しました"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
