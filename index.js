import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToMongoose from "./src/config/mongoose.config.js";

import userRouter from "./src/features/users/user.route.js";
import roomRouter from "./src/features/rooms/room.route.js";
import historyRouter from "./src/features/history/history.route.js";
dotenv.config();

const app = express();

const port = process.env.PORT;

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/history", historyRouter);

app.listen(port, () => {
  connectToMongoose();
  console.log("Server is up at the port ", port);
});