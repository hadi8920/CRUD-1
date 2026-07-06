"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace('/login')
    }
  })
  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace('/login')
  }
  const toBook = () => {
    router.push("/book")
  }
  const createbook = () => {
    router.push("/book/add")
  }
  
  return (
    <div className='flex flex-col gap-2'>
      Dashboard
      <button onClick={handleLogout}>Log out</button>
      <button onClick={toBook}>All Books Data</button>
      <button onClick={createbook}>Create Book</button>
    </div>
  )
}

export default Dashboard
