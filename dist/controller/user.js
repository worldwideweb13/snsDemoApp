"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFollowUser = exports.followUser = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id ||
        req.body.isAdmin) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.id, {
                //$set...req.bodyの要素に全て置き換える
                $set: req.body,
            });
            res.status(200).json("ユーザー情報が更新されました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
};
exports.updateUser = updateUser;
// ユーザー情報の削除
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id ||
        req.body.isAdmin) {
        try {
            const user = await User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報が削除されました");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res
            .status(403)
            .json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
};
exports.deleteUser = deleteUser;
// ユーザー情報の取得
const getUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getUser = getUser;
// ユーザーのフォロー
const followUser = async (req, res) => {
    //自分自身はフォローできないため、フォロー対象ユーザidと自身のuserIdを比較.
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User_1.default.findById(req.params.id);
            const currentUser = await User_1.default.findById(req.body.userId);
            /*
              フォローするアカウントのフォロワーに自分がいなかったらフォローができる
              followers.includes()...includes(id)で配列から引数に一致する検索、ない場合はfalse
              followersは配列なのでincludes()を利用可
            */
            if (currentUser &&
                user &&
                user.followers &&
                user.followers.includes(req.body.userId)) {
                // フォローされたアカウントのフォロワー一覧に追加
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                });
                // 自分のアカウントのフォロー一覧に追加する
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォローに成功しました！");
            }
            else {
                return res
                    .status(403)
                    .json("あなたは既にこのユーザーをフォローしています");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をフォローできません");
    }
};
exports.followUser = followUser;
// ユーザーのフォロー解除
const unFollowUser = async (req, res) => {
    //自分自身はフォローできないため、フォロー対象ユーザidと自身のuserIdを比較.
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User_1.default.findById(req.params.id);
            const currentUser = await User_1.default.findById(req.body.userId);
            /*
           フォロー解除するアカウントのフォロワーに自分がいたらフォロー解除
           followers.includes()...includes(id)で配列から引数に一致する検索、ない場合はfalse
           followersは配列なのでincludes()を利用可
          */
            if (currentUser &&
                user &&
                user.followers &&
                user.followers.includes(req.body.userId)) {
                // フォローされたアカウントのフォロワー一覧から削除
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    },
                });
                // 自分のアカウントのフォロー一覧から削除
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォロー解除しました！");
            }
            else {
                return res.status(403).json("このユーザーはフォロー解除できません");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(500).json("自分自身をフォロー解除できません");
    }
};
exports.unFollowUser = unFollowUser;
