import { Router } from 'express'
import validateUser from '../middleware/validateUser.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkCommentOwner from '../middleware/checkCommentOwner.js'
import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'

const router = new Router()

//Register
router.post('/auth/register', validateUser, authController.registration)

//Login 
router.post('/auth/login', authController.authorization)

//Get all users
router.get('/getAllUsers', userController.getAllUsers)

//Removing user
router.delete('/user/:id', authMiddleware, userController.deleteUser)

//Removing comment
router.delete('/comment/:id', checkCommentOwner, userController.deleteComment)

export default router