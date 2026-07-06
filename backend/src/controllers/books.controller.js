import bookModel from "../models/book.model.js";
import mongoose from "mongoose";

async function giveBooks(req, res) {
  const { book, author, genre } = req.body;

  if (!book || !author || !genre) {
    throw new Error("book ,auther and genre are required!");
  }
  const foundBook = await bookModel.findOne({ book: book });
  if (foundBook) {
    throw new Error("book should be unique");
  }

  // type validatoin

  const bookData = await bookModel.create({
    book,
    author,
    genre,
  });

  if (!bookData) {
    throw new Error("Something went wrong");
  }

  res.status(201).json({
    message: "Data takeen successfully",
    data: bookData,
  });
}

async function getAllBooks(req, res) {
  const { genre, sort, order } = req.query;
  const sortObj = {};
  const filter = {};
  if (sort) {
    sortObj[sort] = order === "desc" ? -1 : 1;
  }
  if (genre) {
    filter.genre = genre;
  }
  const booksData = await bookModel.find(filter).sort(sortObj);
  if (!booksData) {
    throw new Error("Somethinf went wrong");
  }

  res.status(200).json({
    message: "Book Fetched Successfully",
    data: booksData,
  });
}

async function updateBooks(req, res) {
  const { book, author, genre } = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  if (!book || !author || !genre) {
    throw new Error("book, auther and genre are required!");
  }

  const foundBook = await bookModel.findOne({ book: book, _id: { $ne: id } });
  if (foundBook) {
    throw new Error("book already exists");
  }

  const bookData = await bookModel.findOneAndUpdate(
    { _id: id },
    { book: book, author: author, genre: genre },
    { new: true },
  );
  console.log(bookData);

  if (!bookData) {
    throw new Error("Something went wrong");
  }
  // console.log(bookData)
  res.status(201).json({
    message: "Data Updated Successfully",
    data: bookData,
  });
}

async function deleteBooks(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const bookData = await bookModel.findOneAndDelete({ _id: id });
  if (!bookData) {
    throw new Error("Book already deleted or does not exixts");
  }

  console.log(bookData);

  res.status(201).json({
    message: "Deleted Succesfully",
    data: bookData,
  });
}

async function getBook(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    const bookData = await bookModel.findOne({ _id: id });
    if (!bookData) {
      throw new Error("Book not found")
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data: bookData,
    });
}

export default {
  giveBooks,
  getBook,
  updateBooks,
  deleteBooks,
  getAllBooks,
};
