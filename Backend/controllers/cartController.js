import userModel from "../models/userModel.js"



// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        console.log(userData)
        let cartData = await userData.cartData;


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
    const { userId, itemId } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;

    if (cartData[itemId]) {
      
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item completely removed from cart" });
  } catch (error) {
      console.log(error);
        res.json({success:false, message:"Error"})
  }
};



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

const decrementCartItem = async (req, res) => {
    try {
        const {userId, itemId} = req.body;

        const user = await userModel.findById(userId);
        const cartData = user.cartData;

        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        }else{
            delete cartData[itemId]; 
        }

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message: "Item quantity decreases"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const incrementCartItem = async (req, res) => {
    try {
        const {userId, itemId} = req.body;

        const user = await userModel.findById(userId);
        const cartData = user.cartData;

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1; 
        }

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message: "Item quantity Increased"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
export { addToCart, removeFromCart, getCart, clearCart, incrementCartItem, decrementCartItem }