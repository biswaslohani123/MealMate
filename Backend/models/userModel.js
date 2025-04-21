import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true,unique:true},
    phone:{type:String, required:true,unique:true},
    image:{type:String,default:"" },
    address:{type:String ,default:""},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false, timestamps:true})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;