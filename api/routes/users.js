import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();

//?Create
router.post("/", createUser);

//?Update
router.put("/:id", verifyUser, updateUser);
//?Delete
router.delete("/:id", verifyUser, deleteUser);
//?Get
router.get("/:id", verifyUser, getUser);
//?Get All
router.get("/", verifyUser, getAllUsers);

export default router;
