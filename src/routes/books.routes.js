import express from 'express'
import booksController from '../controllers/books.controller.js'


const router = express.Router()


router.post("/give_book" , booksController.giveBooks )
router.get("/get_all_book" , booksController.getBooks)
router.patch("/update_book/:id" , booksController.updateBooks)
router.delete("/delete_book/:id" , booksController.deleteBooks)
router.get("/get_book" , booksController.getBook)


export default router