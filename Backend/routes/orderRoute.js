import express from "express"
import authMiddleware from "../middleware/Auth.js"
import { placeOrder  } from "../controllers/orderController.js"

const orderRouter = express.Router();

// endpoints

orderRouter.post("/place", authMiddleware, placeOrder);




export default orderRouter;