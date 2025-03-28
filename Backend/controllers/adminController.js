import jwt from 'jsonwebtoken'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

const loginAdmin = async(req , res) => {
    try {
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email,password},process.env.JWT_SECRET)
            res.json({success:true, token})
            
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
//Api to get dashboard data fro admin panel

const adminDashboard = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        const users = await userModel.find({});

        // Calculate overall income
        const totalIncome = orders.reduce((acc, order) => acc + order.amount, 0);

        const dashdata = {
            orders: orders.length,
            users: users.length,
            latestorders: orders.reverse().slice(0, 10),
            totalIncome
        };

        res.json({ success: true, dashdata });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {loginAdmin,adminDashboard}