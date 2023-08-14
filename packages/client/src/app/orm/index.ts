import { dbConnect } from '@/app/orm/init'
import {
  createTopic,
  getTopicById,
  getTopicsByFirstName,
  updateTopicById,
} from '@/app/orm/models/Topic/TopicController'

export const startApp = () => {
  dbConnect().then(async () => {
    await createTopic('First try')

    const topics = await getTopicsByFirstName('First try')

    if (!topics.length) {
      throw 'Not found'
    }

    const { id } = topics[0]

    await updateTopicById(id, { title: 'updatedTopic' })

    const findedTopic = await getTopicById(id)

    console.log('Finded topic', findedTopic)
  })
}
