import express from 'express'
import authContoller from '../controllers/auth.contoller.js'


const router = express.Router()

router.post('/register' , authContoller.registerUser)
router.post('/login' , authContoller.loginUser)
router.post('/logout' , authContoller.logoutUser)


export default router