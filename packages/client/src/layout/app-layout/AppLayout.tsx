import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/app/context'
import { AppWrapper } from '@/components'

import 'react-toastify/dist/ReactToastify.css'

export const AppLayout: FC = (): JSX.Element => (
  <AppWrapper>
    <AuthProvider>
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  </AppWrapper>
)
