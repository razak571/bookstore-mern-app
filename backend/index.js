import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.mongoDBURL;
const baseUrl = process.env.BASEURL;

app.use(express.json());

app.use(
  cors({
    origin: baseUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  return response.status(200).send("welcome to bookstore mern app");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
