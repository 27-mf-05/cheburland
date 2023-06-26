import {
  Forum as ForumPage,
  ForumTopic as ForumTopicPage,
  Game as GamePage,
  LeaderBoard as LeaderBoardPage,
  Login as LoginPage,
  Main as MainPage,
  Page500,
  Profile as ProfilePage,
  Registration as RegistrationPage,
  Page404,
} from '@/pages'
import { PageType, RouteName, RoutesType } from './types'

export const routes: RoutesType = {
  [RouteName.Main]: {
    title: 'Main',
    path: '/',
    component: MainPage,
    type: PageType.notAuthenticated,
  },
  [RouteName.Login]: {
    title: 'Login',
    path: '/login',
    component: LoginPage,
    type: PageType.notAuthenticated,
  },
  [RouteName.Registration]: {
    title: 'Registration',
    path: '/registration',
    component: RegistrationPage,
    type: PageType.notAuthenticated,
  },
  [RouteName.Forum]: {
    title: 'Forum',
    path: '/forum',
    component: ForumPage,
    type: PageType.authenticated,
  },
  [RouteName.ForumTopic]: {
    title: 'Forum Topic',
    path: '/forum-topic',
    component: ForumTopicPage,
    type: PageType.authenticated,
  },
  [RouteName.Game]: {
    title: 'Game',
    path: '/game',
    component: GamePage,
    type: PageType.authenticated,
  },
  [RouteName.LeaderBoard]: {
    title: 'Leader Board',
    path: '/leader-board',
    component: LeaderBoardPage,
    type: PageType.authenticated,
  },
  [RouteName.Profile]: {
    title: 'Profile',
    path: '/profile',
    component: ProfilePage,
    type: PageType.authenticated,
  },
  [RouteName.Page500]: {
    title: 'Page 500',
    path: '/page-500',
    component: Page500,
    type: PageType.common,
  },
  [RouteName.Page404]: {
    title: 'Page 404',
    path: '*',
    component: Page404,
    type: PageType.common,
  },
}
