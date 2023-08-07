import { Link } from 'react-router-dom'

import { Anchor, Flex, Paper, SimpleGrid, Title } from '@mantine/core'

import { RESOURCES_URL } from '@/app/redux/api/endpoints'
import { useLogout, useRoutes } from '@/hooks'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ProfileData, ProfileHeader } from '@/pages'

export const Profile = (): JSX.Element => {
  const { paths } = useRoutes()
  const { handleLogout } = useLogout()
  const { fromOAuth } = useAppSelector(state => state.user)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useAppSelector(state => state.user.currentUser)!
  const avatar = user?.avatar ? RESOURCES_URL + user.avatar : ''

  return (
    user && (
      <Flex
        id="profile"
        py={16}
        justify="center"
        align="center"
        direction="column">
        <Paper shadow="xs" py="md" px="md">
          <Title mb="xl" ta="center">
            Профиль пользователя
          </Title>
          <ProfileHeader userName={user.first_name} avatar={avatar} />
          <ProfileData user={user} />
          <SimpleGrid cols={1}>
            <Anchor component={Link} to={paths.ChangeProfile}>
              Изменить данные
            </Anchor>

            <Anchor
              hidden={fromOAuth}
              component={Link}
              to={paths.ChangePassword}>
              Изменить пароль
            </Anchor>
            <Anchor onClick={handleLogout} color="red">
              Выйти
            </Anchor>
          </SimpleGrid>
        </Paper>
      </Flex>
    )
  )
}
