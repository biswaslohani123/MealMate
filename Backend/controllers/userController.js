import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import transporter from "../config/nodemailer.js";

// Login User logic
const loginUser = async (req,res) => {
    const {email,password} = req.body;

    if (!email || !password) {
        return res.json({success:false, message: 'Email and Password are required'})
    }
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User is not exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false, message:"Invalid Password or email"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 160 * 60 * 1000
        });
        return res.json({success: true, message:'Welcome'});

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}




//register User logic
const registerUser = async (req, res) => {
    const {name,password,email} = req.body;

    if (!name || !email || !password) {
        return res.json({success: false, message: 'Missing Details'})
    }
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
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 160 * 60 * 1000
        });
        //sending Welcome Email
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome To MealMate',
            text: `Welcome to MealMate website. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);
console.log(mailOptions);

        return res.json({success: true, message: 'User Created'});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

 const logoutUser = async(req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message: "Logged Out"});

    } catch (error) {
        return res.json({ success: false, message: 'Error'})
    }
}

// send Opt verification to user email logic

const sendVerifyOtp = async(req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.json({success: false, message: "Account is already verified"})
        }

       const otp = String(Math.floor(100000 + Math.random() * 900000));

       user.verifyOtp = otp;
       user.verifyOtpExpireAt= Date.now() + 24 * 60 * 60 * 1000

       await user.save();

       const mailOption = {
        from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
       }
       await transporter.sendMail(mailOption)

       res.json({success: true, message: 'Verification OTP Sent on Email'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//verifying email and otp
const verifyEmail =async (req, res) => {
    const {userId, otp} = req.body;
    if (!userId || !otp) {
        return res.json({success: false, message: 'Missing Details'});
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({success: false, message: 'User Not Found'});
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP has been Expired'});
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt= 0;

        await user.save();
        return res.json({success:true, message: 'Email verified successfully'})

    } catch (error) {
        return res.json({success: false, message: 'Error'})
    }
}

//check if user is Authenticated logic
const isAuthenticated = async(req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        return res.json({success: false, message: 'Error'})
    }
}

// Send Password Reset OTP
const sendResetOTP = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.json({success: false, message:'Email is Required'})
    }
    try {
        const user = await userModel.findOne({email});
            if (!user) {
                return res.json({success: false, message: 'User not Found'})
            }
            const otp = String(Math.floor(100000 + Math.random() * 900000));

            user.resetOtp = otp;
            user.resetOtpExpireAt= Date.now() + 15 * 60 * 1000

            await user.save()

            const mailOption = {
                from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: 'Password Reset OTP',
                    text: `Your OTP for resetting your password is ${otp}. use this OTP to resetting your password`
               }
               await transporter.sendMail(mailOption)
        
               res.json({success: true, message: ' OTP Sent on Email'})
     
        
    } catch (error) {
        return res.json({success: false, message: 'Error'})
    }
}

//Reset User Password
const  resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({success: false, message: 'Email, OTP, and new password are requried'});
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }
        if (user.resetOtp === ""|| user.resetOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'})
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP is expired'})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0

        await user.save();
        return res.json({success: true, message: 'Password Has been reset Sucessfully'})
    } catch (error) {
        return res.json({success: false, message: 'Error'})
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
export {loginUser, registerUser,logoutUser, adminlogin,sendVerifyOtp,verifyEmail,isAuthenticated, sendResetOTP, resetPassword}