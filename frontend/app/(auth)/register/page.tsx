'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerUser } from '@/lib/auth/api'
import Link from 'next/link'
import Loading from './loading'
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
          setLoader(false)
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
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Already have an account? then login
        </CardDescription>
        <CardAction>
          <Button variant="link"><Link href='/login'>Login</Link></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
              className = {cn(error.toLowerCase().includes("username") && "text-destructive placeholder:text-destructive border-destructive focus-visible:ring-destructive")}
                name="usernmae"
                type="username"
                placeholder="m@example.com"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                required
              />
            </div>
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
        {loader && <Loading/>}
        <Button onClick= {handleSubmit} disabled = {loader} type="submit" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
      </div>
    </div>
  )
}

export default RegisterPage
