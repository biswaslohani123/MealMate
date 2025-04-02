import express from "express";
import { loginUser, registerUser, getProfile, updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/Auth.js";
import multer from 'multer'
const userRouter = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const uploads = multer({storage:storage})
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.post("/update", uploads.single("image"), updateProfile);


export default userRouter;
