"use client"
import { getBook } from '@/lib/books/books'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetBoook = () => {
    const router = useRouter()
    const params = useParams()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [book, setBook] = useState<any>(null)
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.replace('/login')
        return
      }
      async function getABook(){
        const res = await getBook(params.id as string)
        setBook(res.data)
      }

      getABook()
    }, [])

    const toDashboard = () => {
    router.push("/dashboard")
  }
    
  return (
    
    <div className="flex flex-col gap-5">
      <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
      <h1>Single Book Data</h1>
      <div>
      <h1>{book?.book}</h1>
      <h1>{book?.author}</h1>
      <h1>{book?.genre}</h1>
      </div>
    </div>
  )
}

export default GetBoook
