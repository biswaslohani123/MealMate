import express from 'express'
import Auth from '../middleware/Auth.js'
import { getUserData } from '../controllers/authController.js';


const usersRouter = express.Router();

usersRouter.get('/data', Auth, getUserData)

export default usersRouter;