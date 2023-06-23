import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const NotAuthenticatedLayout: FC = (): JSX.Element => (
  <>
    <Outlet />
  </>
);
