import express from 'express'

import { TopicController } from '../../controllers'
import commentsRouter from '../commentRoutes/commentRoutes'

const topicsRouter: express.Router = express.Router()

topicsRouter.post('/', TopicController.createTopic)
topicsRouter.get('/', TopicController.getPaginatedTopics)
topicsRouter.get('/:topicId', TopicController.getTopicById)
topicsRouter.put('/', TopicController.updateTopicById)
topicsRouter.delete('/:topicId', TopicController.deleteTopicById)

topicsRouter.use('/:topicId/comment', commentsRouter)

export default topicsRouter
