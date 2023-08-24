import type { Request, Response } from 'express'

import { ReplyModel } from '../../models'

export class ReplyController {
  static async createReply(req: Request, res: Response) {
    const { author_name, message } = req.body
    const topicId = req.params.topicId
    const commentId = req.params.commentId
    const data = await ReplyModel.create({
      author_name,
      message,
      topicId,
      commentId,
    })
    res.json(data)
  }

  static async getRepliesByCommentId(req: Request, res: Response) {
    const commentId = req.params.commentId
    const data = await ReplyModel.findAll({ where: { commentId } })
    res.json(data)
  }
  static async getReplyById(req: Request, res: Response) {
    const id = req.params.commentId
    const data = await ReplyModel.findOne({ where: { id } })
    res.json(data)
  }
  static async updateReplyById(req: Request, res: Response) {
    const { id, data } = req.body
    const responseData = await ReplyModel.update(data, { where: { id } })
    res.json(responseData)
  }

  static async deleteReplyById(req: Request, res: Response) {
    const id = req.params.commentId
    const data = await ReplyModel.destroy({ where: { id } })
    res.json(data)
  }
}
