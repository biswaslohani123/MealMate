import express from 'express'
import { addFood, listfood, Removefood } from '../controllers/foodController.js'
import multer from 'multer'
import adminAuth from '../middleware/AdminAuth.js';

const foodRouter = express.Router();

// image storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({storage:storage})

foodRouter.post("/add",adminAuth, uploads.single("image"),addFood);
foodRouter.get("/list" ,listfood);
foodRouter.post("/remove", adminAuth, Removefood);













export default foodRouter;