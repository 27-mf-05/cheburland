import { TopicModel } from '../models'

export async function createTopic(
  title: string,
  replies_count: number,
  message: string
) {
  return TopicModel.create({ title, replies_count, message })
}

export async function updateTopicById(id: number, data: { title: string }) {
  return TopicModel.update(data, { where: { id } })
}

export async function deleteTopicById(id: number) {
  return TopicModel.destroy({ where: { id } })
}

export async function getTopicById(id: number) {
  return TopicModel.findOne({ where: { id } })
}

export async function getTopicsByTitle(title: string) {
  return TopicModel.findAll({ where: { title } })
}
