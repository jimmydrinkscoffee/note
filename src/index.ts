import { json } from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import noteRoute from "./routes/note";

dotenv.config();

const server = express();

server.use(json());

server.use("/auth", authRoute);
server.use("/note", noteRoute);

server.listen(process.env["PORT"], () => {
  console.log("server up:", process.env["PORT"]);

  mongoose.connect(process.env["DB_URI"]!, (err) => {
    if (err) {
      console.log("connect to db failed");
      return process.exit(1);
    }

    console.log("connect to db successfully");
  });
});
