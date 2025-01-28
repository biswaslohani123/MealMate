import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'


// placing user order from fronend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        // clear user cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
    } catch (error) {
        
    }
}
export {placeOrder}