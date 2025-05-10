import express from 'express'
import { addToCart, removeFromCart, getCart, clearCart, decrementCartItem, incrementCartItem } from '../controllers/cartController.js'
import authMiddleware from '../middleware/Auth.js';



const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware, getCart)
cartRouter.delete('/delete',authMiddleware,clearCart)
cartRouter.post('/decrement',authMiddleware,decrementCartItem)
cartRouter.post('/increment',authMiddleware,incrementCartItem)

export default cartRouter;