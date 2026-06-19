import bookModel from "../models/book.model.js";
import mongoose from "mongoose";

async function giveBooks(req, res) {
  try {
    const { book, author , genre } = req.body;
  
    if (!book || !author || !genre) {
      // throw new Error("book and auther are required!");
      return res.status(500).json({
        error: "book and auther are required!",
      });
    }
    const foundBook = await bookModel.findOne({ book: book });
    if (foundBook) {
      return res.status(500).json({
        error: "book should be unique",
      });
    }
  
    // type validatoin
  
    const bookData = await bookModel.create({
      book,
      author,
      genre
    });
  
    if (!bookData) {
      return res.status(404).json({
        error : "Something went wrong"
      })
    }
  
    res.status(201).json({
      message: "Data takeen successfully",
      data: bookData,
    });
  } catch (err) {
    res.status(400).json({
      error : err.message
    })
    
  }
}

async function getAllBooks(req, res) {
  try {
    
    const genre = req.query.genre
    const sort = req.query.sort
    const order = req.query.order
    const sortObj = {}
    const filter = {}
    if(sort){
      sortObj[sort] = order === 'desc' ? -1 : 1
    }
    if(genre){
      filter.genre = genre
    }
    const booksData = await bookModel.find(filter).sort(sortObj);
    if (!booksData) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }

    res.status(201).json({
      message: "Book Fetched Successfully",
      Data: booksData,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updateBooks(req, res) {
  try {
    const { book, author , genre } = req.body;
    const id = req.params.id;
    
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({
        error: "invalid ID Format",
      });
    }
  
    if (!book || !author || !genre) {
      // throw new Error("book and auther are required!");
      return res.status(500).json({
        error: "book, genre and author are required!",
      });
    }
  
    const foundBook = await bookModel.findOne({ book: book , _id:{$ne : id} });
    if (foundBook) {
      return res.status(500).json({
        error: "book already exists",
      });
    }
  
    const bookData = await bookModel.findOneAndUpdate(
      { _id: id },
      { book: book, author: author , genre : genre },
      {new : true}
    );
    console.log(bookData)
  
    if (!bookData) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
    // console.log(bookData)
    res.status(201).json({
      message: "Data Updated Successfully",
      data: bookData,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function deleteBooks(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID Format",
      });
    }
  
    const bookData = await bookModel.findOneAndDelete({ _id: id });
    if (!bookData) {
      return res.status(500).json({
        error: "Book already deleted or not exists",
      });
    }
  
    console.log(bookData);
  
    res.status(201).json({
      message: "Deleted Succesfully",
      data: bookData,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function getBook(req, res){

  try {
    const id = req.params.id
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        error: "Invalid ID format"
      })
    }
  
    const bookData = await bookModel.findOne({_id:id})
    if(!bookData){
      return res.status(400).json({
        error : "Book not found"
      })
    }
  
    res.status(200).json({
      message : "Data fetched successfully",
      Data : bookData
    })
  } catch (err) {
    return res.status(400).json({
      error : err.message
    })
  }
}

export default {
  giveBooks,
  getBook,
  updateBooks,
  deleteBooks,
  getAllBooks
};
