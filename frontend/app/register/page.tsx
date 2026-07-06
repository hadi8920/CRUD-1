'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerUser } from '@/lib/auth/api'
import Link from 'next/link'
import Loading from './loading'

const RegisterPage = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        setLoader(true)
        setError("")
        try {
          const result = await registerUser(username ,email ,password)
          if(result.data){
            localStorage.setItem("token" , result.token)
            router.replace('/dashboard')
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          setError(error.message)
        }finally{
          setLoader(false)
        }
    }
    const toDashboard = () => {
    router.push("/dashboard")
  }
  return (
    <div>
      <div >
        <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
        <h1>Register</h1>
        <div  >
            <form  className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <input
                 type="text"
                 name = "username"
                 placeholder='Enter your username'
                 value={username}
                 onChange={(e) => {
                   setUsername(e.target.value)
                 }}
                  />
                <input
                 type="email"
                 name = "emial"
                 placeholder='Enter your email'
                 value={email}
                 onChange={(e) => {
                   setEmail(e.target.value)
                 }}
                  />
                <input
                 type="password"
                 name = "password"
                 placeholder='Enter your password'
                 value={password}
                 onChange={(e) => {
                   setPassword(e.target.value)
                 }}
                  />
                {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <Loading/>}
                  <button disabled={loader} type ="submit">Resgiter</button>
                  <p>Already have an account</p>
                  <Link href="/login">Login</Link>
            </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
