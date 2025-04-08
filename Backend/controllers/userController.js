import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import transporter from "../config/nodemailer.js";
import fs from 'fs';




// Login User logic
const loginUser = async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({success: false, message : 'Email and password are required'})
    }
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User does not exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success: false, message:"Invalid credentials"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'});

            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none':'strict',
                maxAge: 7 + 24 * 60 * 60 * 1000
            })
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}






//register User logic
const registerUser = async (req, res) => {
    const {name, password, email, phone} = req.body;

    if (!name || !email || !password) {
        return res.json({success:false, message: 'Missing Details'})
    }
    
    try{

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
            password:hashedPassword,
            phone:phone
        })
            const user = await newUser.save()
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'});

            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none':'strict',
                maxAge: 7 + 24 * 60 * 60 * 1000
            })

            //Sending Welcome email
            const mailOptions ={
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome To MealMate🍔',
                text:`Welcome to MealMate website. Your account has been created with email id: ${email}`
            }
            await transporter.sendMail(mailOptions)
           

            res.json({success:true,token})
    }catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//Get profile
const getProfile = async (req, res) => {
    try {
        
        const { userId } = req.body;
        console.log(req.body)
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }
        
        
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        
        res.json({ 
            success: true, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone:user.phone,
                image: user.image,
                address: user.address,
              
            } 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving user profile" });
    }
}


// Postupdateprofile
const updateProfile = async (req, res) => {
    const { name, phone, address, id } = req.body;

    if (!id) {
        return res.json({ success: false, message: "User not authenticated" });
    }

    const image_filename = req.file ? req.file.filename : null;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        user.name = name;
        if (image_filename) user.image = image_filename;
        user.phone = phone;
        user.address = address;

        await user.save();
        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {loginUser, registerUser, getProfile, updateProfile}