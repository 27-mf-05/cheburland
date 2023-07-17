import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { generateRoutePath } from '@/app/routes'
import { RouteName } from '@/app/routes'

import { useUrl } from './useUrl'

type NavigateType = { [k: string]: () => void }

type RoutesReturnType = {
  paths: RoutesPathsType
  navigateTo: NavigateType
}

export type RoutesPathsType = Record<keyof typeof RouteName, string>

export const useRoutes = (): RoutesReturnType => {
  const navigate = useNavigate()

  const { forumTopicId } = useUrl()

  const Main = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Main,
      }),
    []
  )

  const AddForumTopic = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.AddForumTopic,
      }),
    []
  )

  const ChangePassword = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.ChangePassword,
      }),
    []
  )

  const Forum = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Forum,
      }),
    []
  )

  const ForumTopic = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.ForumTopic,
        params: { forumTopicId },
      }),
    [forumTopicId]
  )

  const Game = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Game,
      }),
    []
  )

  const LeaderBoard = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.LeaderBoard,
      }),
    []
  )

  const Login = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Login,
      }),
    []
  )

  const Registration = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Registration,
      }),
    []
  )

  const Profile = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Profile,
      }),
    []
  )

  const Page404 = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Page404,
      }),
    []
  )

  const Page500 = useMemo(
    () =>
      generateRoutePath({
        name: RouteName.Page500,
      }),
    []
  )

  const paths: RoutesPathsType = useMemo(() => {
    return {
      Main,
      AddForumTopic,
      ChangePassword,
      Forum,
      ForumTopic,
      Game,
      LeaderBoard,
      Login,
      Page404,
      Page500,
      Profile,
      Registration,
    }
  }, [
    Main,
    AddForumTopic,
    ChangePassword,
    Forum,
    ForumTopic,
    Game,
    LeaderBoard,
    Login,
    Page404,
    Page500,
    Profile,
    Registration,
  ])

  const navigateTo: NavigateType = useMemo(
    () =>
      Object.entries(paths).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: () => navigate(value),
        }
      }, {}),
    [navigate, paths]
  )

  return {
    paths,
    navigateTo,
  }
}
