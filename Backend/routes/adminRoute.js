import express from 'express'
import { adminDashboard, getAllUsers, loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.post('/adminlogin', loginAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.get('/users', getAllUsers)


export default adminRouter