import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Paper } from '@mantine/core'

export const AuthenticatedLayout: FC = (): JSX.Element => (
  <Paper shadow="xs" p="md">
    <Outlet />
  </Paper>
)
