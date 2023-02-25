import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import CookieParser from "cookie-parser";

dotenv.config();
const app = express();

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO, () => {
    console.log("database connected");
  });
} catch (error) {
  console.log("error in database connection", error.message);
}

mongoose.connection.on("disconnected", () => {
  console.log("datanase disconnected");
});

//? middlewares
app.use(CookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", authRoute);

app.use((err, req, resp, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";
  return resp.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  console.log("Server  is live on http://localhost:5000");
});
