import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login User logic
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User is not exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false, message:"Invalid User"})
        }
        const token = createToken(user._id);
        res.json({success:true, token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}

//Token creation
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User logic
const registerUser = async (req, res) => {
    const {name,password,email} = req.body;
    try {
        //checking is the user is already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please Enter a Valid email"})
        }
        if (password.length<8) {
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hasing userPassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// Route fro admin Login
const adminlogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
            
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
        
    }
}
export {loginUser, registerUser, adminlogin}