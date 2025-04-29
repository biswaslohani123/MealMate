import express from 'express'
import { adminDashboard, deleteUser, getAllUsers, loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/adminAuth.js'

const adminRouter = express.Router()

adminRouter.post('/adminlogin', loginAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.get('/users',getAllUsers)
adminRouter.delete('/users/:id', authAdmin,deleteUser)


export default adminRouter