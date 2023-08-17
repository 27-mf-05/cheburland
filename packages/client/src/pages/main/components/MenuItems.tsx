import { useRoutes } from '@/hooks'

import { styles } from './styles'

export const MenuItems = () => {
  const { paths } = useRoutes()

  const { classes } = styles()

  const menuItems = [
    {
      title: 'Игра',
      to: paths.Game,
      bg: 'brand.2',
      color: 'white',
      style: classes.gameItem,
    },
    {
      title: 'Профиль',
      to: paths.Profile,
      bg: 'brand.3',
      color: 'brand.2',
      style: classes.otherItem,
    },
    {
      title: 'Лидерборд',
      to: paths.LeaderBoard,
      bg: 'brand.3',
      color: 'brand.2',
      style: classes.otherItem,
    },
    {
      title: 'Форум',
      to: paths.Forum,
      bg: 'brand.3',
      color: 'brand.2',
      style: classes.otherItem,
    },
  ]
  return { menuItems }
}
