import express from 'express'
import authMiddleware from '../middleware/Auth.js'
import { placeOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

//endpoint
orderRouter.post("/place", authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)

export default orderRouter;
