import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name : req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}

// all food list
const listfood = async(req , res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
        
    }
} 

// Remove Food item

const Removefood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,() => {})
           
            

        await foodModel.findByIdAndDelete(req.body.id);



        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        
    }
}
// food active status
const FoodStatus = async (req, res) => {
    try {
        const foodId = req.body.id;
        const food = await foodModel.findById(foodId);
        
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }
        
        
        food.active = !food.active;
        
        await food.save();
        
        res.json({
            success: true,
            message: `Food ${food.active ? 'activated' : 'deactivated'} successfully`,
            active: food.active
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error toggling food status" });
    }
};





export {addFood, listfood, Removefood, FoodStatus}
