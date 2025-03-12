import express from 'express'
import { addToCart, removeFromCart, getCart, clearCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/Auth.js';
import adminAuth from '../middleware/AdminAuth.js';


const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware,adminAuth,addToCart)
cartRouter.post("/remove",adminAuth, authMiddleware, removeFromCart)
cartRouter.post("/get",adminAuth, authMiddleware, getCart)
cartRouter.delete('/delete',adminAuth,authMiddleware,clearCart)

export default cartRouter;