import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


async function registerUser(req , res){  
    

    const {username , email , password} = req.body
    console.log("username" , username)
    if(!username || !email || !password){
        throw new Error("Username , Email and password are required")
    }

   
//  if(!email.inlcudes("@")){
//         return res.status(400).json({
//             error : "Email is incorrect"
//         })
//     }

    const isUserExists = await userModel.findOne({$or:[{username : username}, {email : email}]})

    if(isUserExists){
        throw new Error("User already exists")
    }
    
    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username,
        password : hashedPassword,
        email
    })

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET)


    res.status(201).json({
        message : "User Registered successfully",
        token,
        data : user
    })
}

async function loginUser(req, res){
    // try {
        console.log('login route hit...')
        console.log('req.body',req.body)
        const {email , password} = req.body;
             
        if(!email || !password){
            throw new Error("Email and Password are required")
        }
    
        console.log('1');
    
        const user = await userModel.findOne({email})
    
        console.log('11111')
    
        console.log('user',user)
        if(!user){
            throw new Error("Password or email is incorrect")
        }
    
        const isPasswordValid = await  bcrypt.compare(password , user.password)
    
        if(!isPasswordValid){
            throw new Error("Password is incorrect")
        }
    
        const token = jwt.sign({
            id:user._id
        } , process.env.JWT_SECRET)
    
        res.status(200).json({
            message :"User Logged in successfully",
            token : token,
            data : user
        })
    // } catch (error) {
    //     console.log("error in catch" , error)
    //     throw new Error("Something went wrong" , error)
    // }

}

async function logoutUser(req, res){
    res.status(200).json({
        message : "Logged out successfuly",
        data : user
    })
}


export default {
    registerUser,
    loginUser,
    logoutUser
}