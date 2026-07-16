"use client"
import { deleteBook, getAllBooks } from "@/lib/books/books";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area";


const Book = () => {
  const [books, setBooks] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toDeleteBook, setToDeleteBook] = useState<any>(null)
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

  const toTask = (id:string) => {
    router.replace(`/books/${id}`)
  }
  return (
    <div >
      <button onClick={toDashboard} className='text-3xl'>Dashboard</button>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <ScrollArea className="rounded-md border h-85">
        <Table>
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          <TableHead className="w-[100px]">Book</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book : any) => (
          <TableRow className="cursor-pointer" key={book._id}>
            <TableCell className="font-medium">{book.book}</TableCell> 
            <TableCell>{book.author}</TableCell> 
            <TableCell>{book.genre}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => {
        e.stopPropagation()
      }} render={<Button onClick={(e) => {
        e.stopPropagation()
      }} className="cursor-pointer" variant="outline">⋮</Button>} />
      <DropdownMenuContent onClick={(e) => {
        e.stopPropagation()
      }}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuItem variant="destructive" onClick={() => {
            setToDeleteBook(book)
          }}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            toUpdate(book._id)
          }}>
            Update
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
      </ScrollArea>
      

    <AlertDialog 
    open =  {toDeleteBook !== null}
    onOpenChange={(open)=>{
      if(!open){
        setToDeleteBook(null)
      }
    }}
    >
      {/* <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} /> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            the record of book
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={async() => {
              await deleteBook(toDeleteBook._id)

              setBooks(books.filter((b : any) => b._id !== toDeleteBook._id))

              setToDeleteBook(null)
          }} >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>

  );
};

export default Book;
