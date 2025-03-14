import express from 'express'
import { addToCart, removeFromCart, getCart, clearCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/Auth.js';
import adminAuth from '../middleware/AdminAuth.js';


const cartRouter = express.Router();

cartRouter.post("/add",addToCart)
cartRouter.post("/remove", removeFromCart)
cartRouter.post("/get", getCart)
cartRouter.delete('/delete',clearCart)

export default cartRouter;