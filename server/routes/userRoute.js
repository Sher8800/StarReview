import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import userController from '../controllers/userController.js'

const userRouter = new Router()

//Get all users
userRouter.get('/getAllUsers', userController.getAllUsers)

//Removing user
userRouter.delete('/user/:id', authMiddleware, userController.deleteUser)

export default userRouter