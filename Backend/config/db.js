import mongoose from "mongoose";


 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://MealMate:9814136254@cluster0.x7gbh.mongodb.net/MealMate').then(() => console.log("DB Connected"));
}