import { Topic } from '@/app/orm/init'
import { ITopic } from '@/app/orm/models/Topic/index'

export async function createTopic(title: string) {
  return Topic.create({ title })
}

export async function updateTopicById(id: number, data: ITopic) {
  return Topic.update(data, { where: { id } })
}

export async function deleteTopicById(id: number) {
  return Topic.destroy({ where: { id } })
}

export async function getTopicById(id: number) {
  return Topic.findOne({ where: { id } })
}

export async function getTopicsByFirstName(title: string) {
  return Topic.findAll({ where: { title } })
}
