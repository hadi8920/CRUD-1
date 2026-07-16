"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { loginUser } from '@/lib/auth/api'
import Link from 'next/link'
import Loading from './loading'
import { AlertCircleIcon, Link2Off } from "lucide-react"
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
        setLoader(false);
      }
    }
    const toDashboard = () => {
    router.push("/dashboard")
  }

  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          If you dont have an account , then signup
        </CardDescription>
        <CardAction>
          <Button variant="link"><Link href='/register'>Register</Link></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className = {cn(error.toLowerCase().includes("email") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
                name="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
              className = {cn(error.toLowerCase().includes("password") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
              name="password"
              type="password" 
              placeholder= "Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
        <Button onClick= {handleSubmit} disabled = {loader} type="submit" className="w-full">
          {loader ? <Loading/> : "Login"}
        </Button>
      </CardFooter>
    </Card>
    </div>
      </div>
  )
}

export default LoginPage
