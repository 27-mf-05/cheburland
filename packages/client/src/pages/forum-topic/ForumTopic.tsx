import { Box, Container, Flex, ScrollArea, Text, Title } from '@mantine/core'

import { AddCommentForm, CommentList } from './components'

export const ForumTopic = (): JSX.Element => {
  return (
    <Flex id="forum-topic" h="calc(100vh - 64px)" gap="lg" direction="column">
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
              <CommentList />
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
