import express from 'express'
import authMiddleware from "../middlewares/auth.middleware.js";
import booksController from '../controllers/books.controller.js'


const router = express.Router()


router.post("/give_book"  , authMiddleware, booksController.giveBooks )
router.get("/get_all_book", authMiddleware , booksController.getAllBooks)
router.patch("/update_book/:id", authMiddleware , booksController.updateBooks)
router.delete("/delete_book/:id", authMiddleware , booksController.deleteBooks)
router.get("/get_book/:id" , authMiddleware, booksController.getBook)


export default router