import type { Request, Response } from 'express'

import { CommentModel } from '../../models'

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const { author_name, message } = req.body
    const topicId = req.params.topicId
    console.log(req.params.id)
    const data = await CommentModel.create({
      author_name,
      message,
      topicId,
    })
    res.json(data)
  }

  static async getCommentsByTopicId(req: Request, res: Response) {
    const topicId = req.params.topicId
    const data = await CommentModel.findAll({ where: { topicId } })
    res.json(data)
  }
  static async getCommentById(req: Request, res: Response) {
    const id = req.params.commentId
    const data = await CommentModel.findOne({ where: { id } })
    res.json(data)
  }
  static async updateCommentById(req: Request, res: Response) {
    const { id, data } = req.body
    await CommentModel.update(data, { where: { id } })
    res.json(`updated comment ${id}`)
  }

  static async deleteCommentById(req: Request, res: Response) {
    const id = req.params.commentId
    await CommentModel.destroy({ where: { id } })
    res.json(`deleted comment ${id}`)
  }
}
