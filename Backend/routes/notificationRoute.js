import express from 'express'
import { getUserNotifications, markAsRead } from '../controllers/notificationController.js';
import authMiddleware from '../middleware/Auth.js';


const notificationRouter = express.Router();

notificationRouter.get("/get",authMiddleware, getUserNotifications);
notificationRouter.post("/read",authMiddleware, markAsRead)

export default notificationRouter;