"use client"
import { giveBook } from '@/lib/books/books'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import Loading from '../loading'
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";


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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
      <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
      {error && 
          <Alert variant="destructive" className="max-w-md">
        <AlertCircleIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
        }
      
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>
          Create your task
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="book">Book</Label>
              <Input
              className = {cn(error.toLowerCase().includes("book") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
                name="book"
                type="text"
                placeholder="Enter the name of your book"
                value={book}
                onChange={(e) => {
                  setBook(e.target.value)
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="book">Author</Label>
              <Input
              className = {cn(error.toLowerCase().includes("author") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
                name="author"
                type="text"
                placeholder="Enter the name of the author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Genre</Label>
              </div>
              <Input
              className = {cn(error.toLowerCase().includes("genre") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
              name="genre"
              type="text" 
              placeholder= "Enter your genre"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
              }}
              required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {loader && <Loading/>}
        <Button onClick= {handleSubmit} disabled = {loader} type="submit" className="w-full">
          Create
        </Button>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}

export default AddBook
