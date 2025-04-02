import userModel from "../models/userModel.js"
import foodModel from "../models/foodModel.js";


// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        console.log(userData)
        let cartData = await userData.cartData;

        //checking if the food items exists or not
        let foodItem = await foodModel.findById(req.body.itemId);
        if (!foodItem) {
            delete cartData[req.body.itemId];
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            return res.json({success: false, message:"no food items"})
            
        }


        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

// remove items from user cart
const removeFromCart = async (req, res) => {
   try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
   } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
   }
}

// Clear entire user cart
const clearCart = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }, { new: true });
        res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error clearing cart" });
    }
};

// fetch user cart data  
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = await userData.cartData || {};
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}
export {addToCart, removeFromCart, getCart,clearCart}