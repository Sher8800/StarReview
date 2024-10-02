import { Router } from "express";
import userRouter from "./userRoute.js";
import authRouter from "./authRoute.js";
import commentsRouter from "./commentsRoute.js";

const router = new Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/comments', commentsRouter)


export default router