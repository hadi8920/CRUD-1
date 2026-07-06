"use client"
import { deleteBook, getAllBooks } from "@/lib/books/books";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const Book = () => {
  const [books, setBooks] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      router.replace('/login')
      return
    }
    async function fetchBooks() {
      const res = await getAllBooks();
      setBooks(res.data);
    }
    fetchBooks()
  } ,[]);

  const toDashboard = () => {
    router.push("/dashboard")
  }
  const toUpdate = (id:string) => {
    router.push(`/book/edit/${id}`)
  }
  return (
    <div className="flex flex-col gap-5 my-5">
      <button onClick={toDashboard} className='text-3xl'>Dashboard</button>
      <h1>Books</h1>
      <div >
        {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        books.map((book: any) => (
          <div className=" flex flex-col gap-1 my-5" key={book._id}>
            <h2>{book.book}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <button onClick={() => {
              toUpdate(book._id)
            }} >Update Book</button>
            <button onClick={async() => {
              await deleteBook(book._id)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setBooks(books.filter((b:any)=> b._id !== book._id))
            }} className="bg-white text-black">Delete this book</button>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Book;
