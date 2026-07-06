"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { loginUser } from '@/lib/auth/api'
import Link from 'next/link'
import Loading from './loading'

const LoginPage = () => {

    const router = useRouter()
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    
    const handleSubmit = async () => {
      try{
        setLoader(true);
        setError('');
        // console.log('passing body .......', body)
        const result = await loginUser(email , password);
        console.log("result",result)
        // token user ko diya jaa rha hai phir usko dashboard per bheja ja rha hai 
        if(result.data){
          localStorage.setItem("token" , result.token)
          router.replace('/dashboard');
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(e:any){
        console.log('insde api call error:',e)
        setError(e.message);
      }finally{
        setLoader(false);
      }
    }
    const toDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div>
      <div>
        <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
        <h1>Welcome</h1>
        <div className='flex flex-col gap-2'>
                {/* <input
                 name='identifier'
                 placeholder='Enter your username'
                 value = {username}
                 onChange={(e)=> setUsername(e.target.value)}
                 /> */}
                <input
                 name='email'
                 type='email'
                 placeholder='Enter your email'
                 value = {email}
                 onChange={(e)=> setEmail(e.target.value)}
                 />


                <input
                 name='password'
                 type='password'
                 placeholder='Enter your password'
                 value = {password}
                 onChange={(e) => {
                   setPassword(e.target.value)
                 }}
                 />
                 {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <Loading/>}
                
                <button onClick={handleSubmit} disabled={loader}>Submit</button>
                <p>Dont have an account?</p>
                <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
