"use client"
import { giveBook } from '@/lib/books/books'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import Loading from '../loading'

const AddBook = () => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")
    const [book, setBook] = useState("")
    const [author, setAuthor] = useState("")
    const [genre, setGenre] = useState("")

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setLoader(true)
        setError("")
        try {
            const res = await giveBook(book , author , genre)
            if(res.data){
                router.push('/book')
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e:any) {
            setError(e.message)
        }finally{
            setLoader(false)
        }
    }
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.replace('/login')
      }  
    }, [])
    

    const toDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div>
      <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
      <h1>Create Book</h1>
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

          <button disabled = {loader} type="submit">Create Book</button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <Loading/>}
    </div>
  )
}

export default AddBook
