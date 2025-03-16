import express from 'express'
import { adminlogin, isAuthenticated, loginUser,logoutUser,registerUser, resetPassword, sendResetOTP, sendVerifyOtp, verifyEmail } from '../controllers/userController.js'
import Auth from '../middleware/Auth.js'


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout", logoutUser )
userRouter.post('/send-verify-otp', Auth, sendVerifyOtp)
userRouter.post('/verify-account',Auth, verifyEmail)
userRouter.post('/isAuth',Auth,isAuthenticated)
userRouter.post('/admin',adminlogin)
userRouter.post('/send-reset-otp', sendResetOTP)
userRouter.post('/resetpassword', resetPassword)

export default userRouter
