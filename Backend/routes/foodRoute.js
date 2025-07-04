import express from 'express'
import { addFood, listfood, Removefood, FoodStatus } from '../controllers/foodController.js'
import multer from 'multer'


const foodRouter = express.Router();

// image storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({storage:storage})

foodRouter.post("/add",uploads.single("image"),addFood);
foodRouter.get("/list" ,listfood);
foodRouter.post("/remove",  Removefood);
foodRouter.post("/toggle-status", FoodStatus)

export default foodRouter;