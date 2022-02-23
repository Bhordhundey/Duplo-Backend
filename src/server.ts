import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import * as dotenv from "dotenv";
import talkRoute from "./routes/talk";
import attendeeRoute from "./routes/attendee";

dotenv.config();
const app = express();
app.set("trust proxy", true);
app.use(json());

// ROUTES MIDDLEWARE
app.use("/api/talk", talkRoute);
app.use("/api/attendee", attendeeRoute);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URI}`);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!!!!!!`);
  });
};

start();
