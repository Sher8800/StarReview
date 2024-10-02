import { Router } from 'express'
import validateUser from '../middleware/validateUser.js'
import authController from '../controllers/authController.js'

const authRouter = new Router()

//Register
authRouter.post('/register', validateUser, authController.registration)

//Login 
authRouter.post('/login', authController.authorization)

export default authRouter