import { CommentModel } from '../models'

export async function createComment(author_name: string, message: string) {
  return CommentModel.create({ author_name, message })
}

export async function updateCommentById(id: number, data: { message: string }) {
  return CommentModel.update(data, { where: { id } })
}

export async function deleteCommentById(id: number) {
  return CommentModel.destroy({ where: { id } })
}

export async function getCommentById(id: number) {
  return CommentModel.findOne({ where: { id } })
}

export async function getCommentByMessage(message: string) {
  return CommentModel.findAll({ where: { message } })
}
