import transporter from "../config/nodemailer.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



// placing userOrder from frontend

const placeOrder = async (req,res) => {

        const frontend_url = 'http://localhost:5174'
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            paymentMethod:req.body.address

            

        })
       const order =  await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const user = await userModel.findById(req.body.userId);
        const itemList = req.body.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join("");

       const maiilOptions ={
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'YOur Order has been  Placed Sucessfully',
        text: `Dear ${user.name} ,Your Order  has been received, it will be delivered within our standard timing Total amount ${req.body.amount} is you bill`

       }
       await transporter.sendMail(maiilOptions)
        

        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"npr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        })) 

        line_items.push({
            price_data:{
                currency:"npr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:100
            },
            quantity:1
        })
        if(req.body.address.paymentMethod !== "stripe"){
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }, { new: true });
            res.json({success:true,data:'cod'})
            return
        }
        //creating session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

const verifyOrder = async (req,res) => {
    const {orderId,success}  = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});

            const maiilOptions ={
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'YOur Order has been  Placed Sucessfully',
                text: `Dear ${user.name} ,Your Order  has been received, it will be delivered within our standard timing Total amount ${req.body.amount} is you bill`
        
               }
               await transporter.sendMail(maiilOptions)
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// user orders page for frontend

const userOrders = async(req,res) => {

    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}



// orders page for admin panel

const listOrder = async(req, res) =>{
    try {
        const orders = await orderModel.find({}).sort({createdAt: -1}) //newest first
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}


// Api for Updating Order Status
const updateStatus = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate(
            req.body.orderId,
            { status: req.body.status },
            { new: true } 
        );

        if (order) {
            const user = await userModel.findById(order.userId);


            const messageforverystatuschanges  = req.body.status === "Order Out For Delivery"? `Your order is out for delivery .Please be ready to receive it.`:`Your order is: ${req.body.status}.`
            
            

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Order Status Update',
                text: `Dear ${user.name},${messageforverystatuschanges}.Thank you for choosing MealMate!`
            };

            await transporter.sendMail(mailOptions);
        }

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}







export {placeOrder, verifyOrder,userOrders, listOrder, updateStatus }