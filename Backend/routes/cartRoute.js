import express from 'express'
import { addToCart, removeFromCart, getCart, clearCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/Auth.js';
import adminAuth from '../middleware/AdminAuth.js';


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware, getCart)
cartRouter.delete('/delete',authMiddleware,clearCart)

export default cartRouter;