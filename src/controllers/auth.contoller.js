import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


async function registerUser(req , res){  

    const {username , email , password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            error : "Username , Email and password are required"
        })
    }

   
//  if(!email.inlcudes("@")){
//         return res.status(400).json({
//             error : "Email is incorrect"
//         })
//     }

    const isUserExists = await userModel.findOne({$or:[{username : username}, {email : email}]})

    if(isUserExists){
        return res.status(400).json({
            error : "User already exists"
        })
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

    res.cookie("token" , token , {
        httpOnly : true
    })

    res.status(201).json({
        message : "User Registered successfully",
        data : {
            token,
            user
        }
    })
}

async function loginUser(req, res){
    const {username , email , password} = req.body

    if((!username && !email) || !password){
        return res.status(400).json({
            error : "Username or Email and Password is required"
        })
    }

    const user = await userModel.findOne({$or:[{username : username},{email : email}]})

    if(!user){
        return res.status(404).json({
            error : "User not found"
        })
    }

    const isPasswordValid = await  bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(403).json({
            error : "Password is incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(200).json({
        message :"User Logged in successfully"
    })

}

async function logoutUser(req, res){
    res.clearCookie("token")
    res.status(200).json({
        message : "Logged out successfuly"
    })
}


export default {
    registerUser,
    loginUser,
    logoutUser
}