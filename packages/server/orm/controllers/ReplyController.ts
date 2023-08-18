import type { Request, Response } from 'express'

import { ReplyModel } from '../models'

export class ReplyController {
  static async createReply(req: Request, res: Response) {
    const { author_name, message } = req.body
    const topicId = req.params.commentId
    const commentId = req.params.commentId
    const data = await ReplyModel.create({
      author_name,
      message,
      topicId,
      commentId,
    })
    res.json(data)
  }

  static async getReplies(_req: Request, res: Response) {
    const data = await ReplyModel.findAll()
    res.json(data)
  }
  static async getReplyById(req: Request, res: Response) {
    const id = req.params.commentId
    const data = await ReplyModel.findOne({ where: { id } })
    res.json(data)
  }
  static async updateReplyById(req: Request, res: Response) {
    const { id, data } = req.body
    await ReplyModel.update(data, { where: { id } })
    res.json('success')
  }

  static async deleteReplyById(req: Request, res: Response) {
    const id = req.params.commentId
    await ReplyModel.destroy({ where: { id } })
    res.json('success')
  }
}
