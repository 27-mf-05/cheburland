import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { PageWrapper } from '@/components';

export const AppLayout: FC = (): JSX.Element => (
  <PageWrapper columns={1}>
    <Outlet />
  </PageWrapper>
);
