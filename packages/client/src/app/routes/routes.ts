import type { RouteObject } from 'react-router-dom'

import { useAuth } from '@/app/context'
import { AppDispatch } from '@/app/redux/store/store'
import {
  AddForumTopic as AddForumTopicPage,
  ChangePassword as ChangePasswordPage,
  ChangeProfile as ChangeProfilePage,
  Forum as ForumPage,
  ForumTopic as ForumTopicPage,
  Game as GamePage,
  LeaderBoard as LeaderBoardPage,
  Login as LoginPage,
  Main as MainPage,
  Page404,
  Page500,
  Profile as ProfilePage,
  Registration as RegistrationPage,
} from '@/pages'

import { PageType, RouteName, RoutesType } from './types'

// const { fetchUser } = useAuth()
// const dispatch = useAppDispatch()

// const fetchUserLoader = (dispatch: AppDispatch) => {
//   return dispatch
// };

export const routes: RoutesType = {
  [RouteName.Main]: {
    title: 'Main',
    path: '/',
    component: MainPage,
    type: PageType.authenticated,
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
  [RouteName.AddForumTopic]: {
    title: 'Add Forum Topic',
    path: '/add-forum-topic',
    component: AddForumTopicPage,
    type: PageType.authenticated,
  },
  [RouteName.Forum]: {
    title: 'Forum',
    path: '/forum',
    component: ForumPage,
    type: PageType.authenticated,
  },
  [RouteName.ForumTopic]: {
    title: 'Forum Topic',
    path: '/forum/:forumTopicId',
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
  [RouteName.ChangeProfile]: {
    title: 'Change Profile',
    path: '/change-profile',
    component: ChangeProfilePage,
    type: PageType.authenticated,
  },
  [RouteName.ChangePassword]: {
    title: 'Change Password',
    path: '/change-password',
    component: ChangePasswordPage,
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
    path: '/page-404',
    component: Page404,
    type: PageType.common,
  },
}
