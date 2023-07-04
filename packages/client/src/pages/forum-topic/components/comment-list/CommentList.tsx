import type { FC } from 'react'

import { Badge, Box, Flex, Paper, Text } from '@mantine/core'

import type { Comment } from '../../types'

type CommentListProps = {
  comments: Comment[]
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <Flex direction="column" gap="md">
      {comments.map(({ id, user, text, time }) => (
        <Paper withBorder p="md" key={id}>
          <Flex justify="space-between">
            <Box>
              <Text fz="xs" fw={500} fs="italic">
                {user}
              </Text>
              <Text>{text}</Text>
            </Box>
            <Box>
              <Badge>{time}</Badge>
            </Box>
          </Flex>
        </Paper>
      ))}
    </Flex>
  )
}
