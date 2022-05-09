"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// const User = require("../models/User");
const registUser = async (req, res) => {
    try {
        const newUser = await new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.registUser = registUser;
