import transporter from "../config/nodemailer.js";
import notificationModel from "../models/NotificationModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing userOrder from frontend
const placeOrder = async (req, res) => {
  const frontend_url = 'http://localhost:5173';

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod, 
    });

    const order = await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

      
   
    if (req.body.paymentMethod !== "stripe") {
      
      await notificationModel.create({
        userId: req.body.userId,
        message: "Your order has been placed successfully",
        type: "orderPlaced",
        relatedOrderId: order._id,
      });
      
      // Clear cart for COD orders
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      
      // Send email notification for COD order
      const user = await userModel.findById(req.body.userId);
      const itemList = req.body.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join("");
      
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Your Order Has Been Placed Successfully',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: tomato;">Thank you for your order, ${user.name}!</h2>
            <p>Your order has been received and will be delivered within our standard timing.</p>
            <h4>Order Details:</h4>
            <ul>${itemList}</ul>
            <p><strong>Total Amount added with delivery charges:</strong> Rs. ${req.body.amount}</p>
            <p>We hope you enjoy your meal!</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      
      return res.json({ success: true, data: 'cod' });
    }
    

    // Preparing line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "npr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "npr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 100 * 100, // Delivery charge in cents
      },
      quantity: 1,
    });

    if (req.body.paymentMethod !== "stripe") {
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }, { new: true });
      return res.json({ success: true, data: 'cod' });
    }

    // Creating Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while placing the order." });
  }
};

// Verifying Order Payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      const order = await orderModel.findById(orderId);
      await notificationModel.create({
        userId: order.userId,
        message: "Your order has been placed successfully",
        type: "orderPlaced",
        relatedOrderId: order._id,
      });
      
      // Clear cart after successful payment
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
      const user = await userModel.findById(order.userId);
      

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Your Order Has Been Successfully Paid',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: green;">Payment Successfully Processed</h2>
            <p>Dear ${user.name},</p>
            <p>We are pleased to inform you that your payment has been successfully processed for your recent order at MealMate.</p>
            <p><strong>Order Details:</strong></p>
            <ul>
              ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join("")}
            </ul>
            <p><strong>Total Paid:</strong> Rs. ${order.amount}</p>
            <p>Your order will be delivered soon, and we will notify you once it's out for delivery.</p>
            <p>Thank you for choosing MealMate!</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Paid and order updated." });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order deleted." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred during payment verification." });
  }
};

// User Orders Page for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders." });
  }
};

// Orders Page for Admin Panel
const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching all orders." });
  }
};

// API for Updating Order Status
const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { status: req.body.status },
      { new: true }
    );

    if (order) {
      const user = await userModel.findById(order.userId);

      const message = req.body.status === "Order Out For Delivery"
        ? "Your order is out for delivery. Please be ready to receive it."
        : `Your order is: ${req.body.status}.`;

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Order Status Update',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Dear ${user.name},</h2>
            <p>${message}</p>
            <p>Thank you for choosing MealMate!</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      //creating status update notification
      await notificationModel.create({
        userId: order.userId,
        message: `Your Order status: ${req.body.status}`,
        type: "orderStatusChanged",
        relatedOrderId: order._id
      })
    }

    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating order status." });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrder, updateStatus };
