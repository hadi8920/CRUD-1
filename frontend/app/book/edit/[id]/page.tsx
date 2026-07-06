"use client"
import { getBook } from "@/lib/books/books";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateBook } from "@/lib/books/books";
import React from "react";
import Loading from "./loading";

const UpdateBook = () => {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
    async function fetchBook() {
      const res = await getBook(params.id as string);
      setBook(res.data.book);
      setAuthor(res.data.author);
      setGenre(res.data.genre);
    }
    fetchBook();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoader(true);
    setError("");
    const res = await updateBook(params.id as string, book, author, genre);
    if (res.data) {
      router.push("/book");
    }
  }
  const toDashboard = () => {
    router.push("/dashboard")
  }

  return <div>
    <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
      <h1>Update your Book</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>



        <input  
         type="text"
         name = "book"
         placeholder='Enter book'
         value={book}
         onChange={(e)=>{setBook(e.target.value)}}
          />
        <input  
         type="text"
         name = "author"
         placeholder='Enter author'
         value={author}
         onChange={(e)=>{setAuthor(e.target.value)}}
          />
        <input  
         type="text"
         name = "genre"
         placeholder='Enter genre'
         value={genre}
         onChange={(e)=>{setGenre(e.target.value)}}
          />

          <button disabled={loader} type="submit">Update Book</button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <Loading/>}
    </div>
};

export default UpdateBook;
