import express from 'express'
import { register, login, logout, getUser, forgotPassword, resetPassword, refresh } from "../controllers/authcontrollers.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/me', verifyToken, getUser)
authRouter.post('/refresh', refresh)
authRouter.post('/forgotpassword', forgotPassword)
authRouter.post('/resetPassword/:token', resetPassword)

export default authRouter