import { FC, ReactNode } from 'react'

import { Center, Paper } from '@mantine/core'

export const FormWrapper: FC<{
  children: ReactNode
  formId: string
  width?: number | string
  height?: number | string
}> = ({ children, formId, width, height }) => (
  <Center id={formId} py={16} h={height || '100%'}>
    <Paper shadow="sm" radius="md" w={width || 480} p="md" withBorder>
      {children}
    </Paper>
  </Center>
)
