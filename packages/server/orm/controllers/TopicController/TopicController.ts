import type { Request, Response } from 'express'

import { TopicModel } from '../../models'

export class TopicController {
  static async createTopic(req: Request, res: Response) {
    const { title, replies_count, message } = req.body
    const data = await TopicModel.create({
      title,
      replies_count,
      message,
    })
    res.json(data)
  }

  static async getPaginatedTopics(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 0
    const offset = Number(req.query.offset) || 0

    const data = await TopicModel.findAll({ offset: offset, limit: limit })
    res.json(data)
  }
  static async getTopicById(req: Request, res: Response) {
    const id = req.params.topicId
    console.log(id)
    const data = await TopicModel.findOne({ where: { id } })
    res.json(data)
  }
  static async updateTopicById(req: Request, res: Response) {
    const { id, data } = req.body
    const responseData = await TopicModel.update(data, { where: { id } })
    res.json(responseData)
  }

  static async deleteTopicById(req: Request, res: Response) {
    const id = req.params.topicId
    const data = await TopicModel.destroy({ where: { id } })
    res.json(data)
  }
}
