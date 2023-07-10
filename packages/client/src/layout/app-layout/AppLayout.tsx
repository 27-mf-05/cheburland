import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { AppWrapper } from '@/components'

export const AppLayout: FC = (): JSX.Element => (
  <AppWrapper columns={1}>
    <Outlet />
  </AppWrapper>
)
