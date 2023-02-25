import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, resp, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not Authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, resp, next) => {
  verifyToken(req, resp, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};

export const verifyAdmin = (req, resp, next) => {
  verifyToken(req, resp, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not authorized admin"));
    }
  });
};
