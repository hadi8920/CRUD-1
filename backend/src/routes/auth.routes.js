import express from 'express'
import authContoller from '../controllers/auth.controller.js'


const router = express.Router()

router.post('/register' , authContoller.registerUser)
router.post('/login' , authContoller.loginUser)
router.post('/logout' , authContoller.logoutUser)
router.get("/test", (req,res)=>{
   res.send("working");
});

export default router