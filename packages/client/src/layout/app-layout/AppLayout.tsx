import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AppWrapper } from '@/components'

import 'react-toastify/dist/ReactToastify.css'

export const AppLayout: FC = (): JSX.Element => (
  <AppWrapper>
    <Outlet />
    <ToastContainer />
  </AppWrapper>
)
