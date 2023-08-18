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

  static async getTopics(_req: Request, res: Response) {
    const data = await TopicModel.findAll()
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
    await TopicModel.update(data, { where: { id } })
    res.json('success')
  }

  static async deleteTopicById(req: Request, res: Response) {
    const id = req.params.topicId
    await TopicModel.destroy({ where: { id } })
    res.json('success')
  }
}
