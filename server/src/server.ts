import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import apiRoutes from "./routes";
import authRoutes from "./auth";

const SERVER_PORT: number = parseInt(process.env["PORT"]) | 5000;
const MONGO_URL: string = process.env["MONGO_URL"];

mongoose
  .connect(MONGO_URL)
  .then(() => {
    try {
      const app = express();
      app.use(cors());
      app.use(express.json());
      app.use("/api", apiRoutes);
      app.use("/auth", authRoutes);
      app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port ${SERVER_PORT}`);
      });
    } catch (err) {
      console.log("Error starting express server");
      console.log(err);
    }
  })
  .catch((err) => {
    console.log("Error connecting to mongoDB");
    console.log(err);
  });
