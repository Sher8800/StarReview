import { Router } from 'express'
import checkCommentOwner from '../middleware/checkCommentOwner.js'
import commentsController from '../controllers/commentsController.js'

const commentsRouter = new Router()

//Get all comments
commentsRouter.get('/getAllComments', commentsController.getAllComments)

//Create a comment
commentsRouter.post('/create/:id', commentsController.createComment)

//Removing comment
commentsRouter.delete('/remove/:id', checkCommentOwner, commentsController.deleteComment)

export default commentsRouter