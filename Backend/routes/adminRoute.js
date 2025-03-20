import express from 'express'
import { adminDashboard, loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/adminAuth.js'



const adminRouter = express.Router()

adminRouter.post('/adminlogin', loginAdmin)
adminRouter.get('/dashboard',authAdmin,adminDashboard )

export default adminRouter