import express from 'express'
import authMiddleware from '../middleware/Auth.js'
import { listOrder, placeOrder, userOrders, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

//endpoint
orderRouter.post("/place", authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)


export default orderRouter;
