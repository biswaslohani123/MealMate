import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Biswas:9814136254@cluster0.wtg64.mongodb.net/MealMate').then(() => console.log("Db Connected"));
     
}