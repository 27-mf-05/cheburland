import express from 'express'

import { ReplyController } from '../../controllers'

const repliesRouter: express.Router = express.Router({ mergeParams: true })
repliesRouter.post('/', ReplyController.createReply)
repliesRouter.get('/', ReplyController.getReplies)
repliesRouter.get('/:replyId', ReplyController.getReplyById)
repliesRouter.put('/:replyId', ReplyController.updateReplyById)
repliesRouter.delete('/:replyId', ReplyController.deleteReplyById)

export default repliesRouter
