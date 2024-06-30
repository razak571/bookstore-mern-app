import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (request, response) => {
  if (
    !request.body.title ||
    !request.body.author ||
    !request.body.publishYear
  ) {
    return response.status(400).send({
      message: "Send all required fields: title, author and publishYear",
    });
  }

  const newBook = {
    title: request.body.title,
    author: request.body.author,
    publishYear: request.body.publishYear,
  };

  try {
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    if (books.length === 0) {
      return response.status(404).send({
        message: "No books found",
      });
    }
    // return response.status(200).json(books); // better structured output
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send("Invalid ID format");
  }

  try {
    const book = await Book.findById(id);
    if (!book) return response.status(404).send({ message: "Book not found!" });
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format, send proper ID");
  }

  try {
    if (!req.body.title && !req.body.author && !req.body.publishYear) {
      return res.status(400).send({
        mesage: "Send the field you want to update: title, author, publishYear",
      });
    }
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    // const updatedBook = await Book.findById(id);
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log({ message: error.message });
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format, send proper ID");
  }

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.mesage);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
