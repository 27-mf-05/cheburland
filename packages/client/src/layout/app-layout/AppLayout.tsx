import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { PageWrapper } from '@/components'
import { GameOver } from '@/features/gameOver'

export const AppLayout: FC = (): JSX.Element => (
  <PageWrapper columns={1}>
    <GameOver isOpenned={true}></GameOver>
    <Outlet />
  </PageWrapper>
)
