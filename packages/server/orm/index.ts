import { createComment, createReply } from './controllers'
import { createTopic } from './controllers'
import { dbConnect } from './init'

export const startApp = () => {
  dbConnect().then(async () => {
    await createTopic('Topic 1', 0, 'Message')
    await createTopic('Topic 2', 1, 'Message')
    await createTopic('Topic 3', 3, 'Message')

    await createComment('Commentator 1', 'comment1')
    await createComment('Commentator 2', 'comment2')
    await createComment('Commentator 3', 'comment3')

    await createReply('Reply 1', 'reply1')
    await createReply('Reply 2', 'reply2')
    await createReply('Reply 3', 'reply3')
  })
}
