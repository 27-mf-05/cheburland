import * as associations from './associations'
//import { CommentController, ReplyController, TopicController } from './controllers'
import { dbConnect } from './init'

export const startApp = () => {
  associations
  dbConnect().then(async () => {
    //   await TopicController.createTopic('Topic 1', 0, 'Message')
    //   await TopicController.createTopic('Topic 2', 1, 'Message')
    //   await TopicController.createTopic('Topic 3', 3, 'Message')
    //
    //   await CommentController.createComment('Commentator 1', 'comment1')
    //   await CommentController.createComment('Commentator 2', 'comment2')
    //   await CommentController.createComment('Commentator 3', 'comment3')
    //
    //   await ReplyController.createReply('Reply 1', 'reply1')
    //   await ReplyController.createReply('Reply 2', 'reply2')
    //   await ReplyController.createReply('Reply 3', 'reply3')
  })
}
