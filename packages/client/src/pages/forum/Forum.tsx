import { Link } from 'react-router-dom'

import { Button, Flex, Paper, Title } from '@mantine/core'

import { useRoutes } from '@/hooks'

import { ForumTable } from './components'
import type { Topic } from './types'

const topics: Topic[] = [
  { id: '1', subject: 'Topic 1', message: '', replies: 2 },
  { id: '2', subject: 'Topic 2', message: '', replies: 1 },
  { id: '3', subject: 'Topic 3', message: '', replies: 0 },
  { id: '4', subject: 'Topic 4', message: '', replies: 5 },
]

export const Forum = (): JSX.Element => {
  const { paths } = useRoutes()

  return (
    <Flex id="forum" py={16} mih={50} justify="center" align="center">
      <Paper shadow="xs" p="md">
        <Title mb="xl" ta="center">
          Форум
        </Title>
        <Flex mb="xl" justify="space-between">
          <Button component={Link} to={paths.AddForumTopic}>
            Добавить тему
          </Button>
        </Flex>
        <ForumTable topics={topics} />
      </Paper>
    </Flex>
  )
}
