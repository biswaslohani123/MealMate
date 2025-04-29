import jwt from 'jsonwebtoken'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import foodModel from '../models/foodModel.js'

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
        const foods = await foodModel.find({})

        // Calculate overall income
        const totalIncome = orders.reduce((acc, order) => acc + order.amount, 0);

        const dashdata = {
            orders: orders.length,
            users: users.length,
            totalFoods: foods.length,
            latestorders: orders.reverse().slice(0, 5),
            totalIncome
        };

       return res.json({ success: true, dashdata });

    } catch (error) {
        console.log(error);
       return res.json({ success: false, message: "Error" });
    }
};

const getAllUsers = async (req, res) => {
    
    try {
        const users = await userModel.find({}, { name: 1, email: 1, phone: 1, createdAt: 1 });
        return res.json({ success: true, users });
    } catch (error) {
        console.log(error);
       return res.json({ success: false, message: "Error fetching users" });
    }
};

//delete user

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deleteUser) {
            
            return res.json({ success: false, message: "User not found" });
            
        }
        return res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error deleting user" });
    }
}

export {loginAdmin,adminDashboard, getAllUsers, deleteUser}