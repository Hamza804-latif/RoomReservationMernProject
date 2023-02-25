import UserModel from "../models/User.js";
import { createError } from "../utils/error.js";

export const createUser = async (req, resp, next) => {
  const newUser = new UserModel(req.body);
  try {
    const savedUser = await newUser.save();
    return resp.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, resp, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return resp.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, resp, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return resp.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, resp, next) => {
  try {
    let User = await UserModel.findById(req.params.id);
    return resp.status(200).json(User);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, resp, next) => {
  try {
    let Users = await UserModel.find();
    return resp.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
