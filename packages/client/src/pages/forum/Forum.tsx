import { Link } from 'react-router-dom'

import { Button, Container, Flex, Title } from '@mantine/core'

import { ForumTable } from './components'
import type { Topic } from './types'

const topics: Topic[] = [
  { id: '1', subject: 'Topic 1', message: '', replies: 2 },
  { id: '2', subject: 'Topic 2', message: '', replies: 1 },
  { id: '3', subject: 'Topic 3', message: '', replies: 0 },
  { id: '4', subject: 'Topic 4', message: '', replies: 5 },
]

export const Forum = (): JSX.Element => {
  return (
    <Container size="xl">
      <Title mb="xl" ta="center">
        Форум
      </Title>
      <Flex mb="xl" justify="space-between">
        <Button component={Link} to="/add-forum-topic">
          Добавить тему
        </Button>
      </Flex>
      <ForumTable topics={topics} />
    </Container>
  )
}
