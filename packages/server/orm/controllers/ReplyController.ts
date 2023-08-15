import { ReplyModel } from '../models'

export async function createReply(author_name: string, message: string) {
  return ReplyModel.create({ author_name, message })
}

export async function updateReplyById(id: number, data: { message: string }) {
  return ReplyModel.update(data, { where: { id } })
}

export async function deleteReplyById(id: number) {
  return ReplyModel.destroy({ where: { id } })
}

export async function getReplyById(id: number) {
  return ReplyModel.findOne({ where: { id } })
}

export async function getReplyByMessage(message: string) {
  return ReplyModel.findAll({ where: { message } })
}
