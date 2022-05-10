"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.updateUser = void 0;
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
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getUser = getUser;
