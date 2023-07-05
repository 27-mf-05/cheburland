import { ComponentType } from 'react'

export interface RouteConfig {
  title: string
  path: string
  component: ComponentType
  type: PageType
}

export enum PageType {
  common = 'common',
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}

export type RoutesType = Record<RouteName, RouteConfig>

export enum RouteName {
  Main = 'main',
  Login = 'login',
  Profile = 'profile',
  Registration = 'registration',
  Page500 = 'page500',
  Page404 = 'page404',
  LeaderBoard = 'leaderBoard',
  Game = 'game',
  AddForumTopic = 'add-forum-topic',
  ForumTopic = 'forum-topic',
  Forum = 'forum',
  ChangePassword = 'change-password',
}
