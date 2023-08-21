import express from 'express'

import { CommentController } from '../../controllers'
import repliesRouter from '../replyRoutes/replyRoutes'

const commentsRouter: express.Router = express.Router({ mergeParams: true })

commentsRouter.post('/', CommentController.createComment)
commentsRouter.get('/', CommentController.getCommentsByTopicId)
commentsRouter.get('/:commentId', CommentController.getCommentById)
commentsRouter.put('/:commentId', CommentController.updateCommentById)
commentsRouter.delete('/:commentId', CommentController.deleteCommentById)

commentsRouter.use('/:commentId/reply', repliesRouter)

export default commentsRouter
