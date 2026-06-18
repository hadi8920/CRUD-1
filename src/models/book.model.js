import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    book:{
        type:String,
        unique:[true , "Book name should be true"],
        required : true
    },
    author: {
        type :String,
        required : true
    }
})
const bookModel = mongoose.model("books" , bookSchema);

export default bookModel