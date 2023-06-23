import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: FC = (): JSX.Element => (
  <>
    <Outlet />
  </>
);
