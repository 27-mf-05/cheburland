import { FC, ReactNode } from 'react'

import { Flex, Paper } from '@mantine/core'

export const FormWrapper: FC<{
  children: ReactNode
  formId: string
  width: number | string
  height?: number | string
}> = ({ children, formId, width, height }) => (
  <Flex
    id={formId}
    align="center"
    py={16}
    justify="center"
    h={height || '100vh'}>
    <Paper shadow="sm" radius="md" w={width} h="auto" p="md" withBorder>
      {children}
    </Paper>
  </Flex>
)
