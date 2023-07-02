import { Box, Container, Flex, ScrollArea, Text, Title } from '@mantine/core'

import { AddCommentForm, CommentList } from './components'
import type { Comment } from './types'

const comments: Comment[] = [
  { id: '1', user: 'User 1', text: 'Comment 1', time: '13:30' },
  { id: '2', user: 'User 2', text: 'Comment 2', time: '12:20' },
  { id: '3', user: 'User 3', text: 'Comment 3', time: '11:00' },
  { id: '4', user: 'User 4', text: 'Comment 4', time: '10:10' },
]

export const ForumTopic = (): JSX.Element => {
  return (
    <Flex h="calc(100vh - 64px)" gap="lg" direction="column">
      <Box>
        <Container size="xl">
          <Title mb="xl" ta="center">
            Форум
          </Title>
          <Title mb="xl" order={2}>
            Topic Subject
          </Title>
          <Text>Topic Message</Text>
        </Container>
      </Box>
      <Box pos="relative" sx={{ flexGrow: 1 }}>
        <Box pos="absolute" w="100%" h="100%">
          <Container size="xl" h="100%">
            <ScrollArea h="100%">
              <CommentList comments={comments} />
            </ScrollArea>
          </Container>
        </Box>
      </Box>
      <Box>
        <Container size="xl">
          <AddCommentForm />
        </Container>
      </Box>
    </Flex>
  )
}
