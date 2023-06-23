import { ComponentType } from 'react';

export interface RouteConfig {
  title: string;
  path: string;
  component: ComponentType;
  authenticated?: boolean;
}
