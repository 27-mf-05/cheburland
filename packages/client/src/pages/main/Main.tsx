import { Link } from 'react-router-dom'

import { BackgroundImage, Menu, Stack, Text } from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'
import { useRoutes } from '@/hooks'

export const Main = (): JSX.Element => {
  const { paths } = useRoutes()

  return (
    <BackgroundImage id="main" src={bgImage} h="100vh">
      <Stack
        align="flex-start"
        justify="flex-start"
        pl="20%"
        pt="10%"
        h="100%"
        sx={() => ({
          background: 'rgba(0,0,0,0.4)',
        })}>
        <Menu width={200}>
          <Menu.Item bg="brand.2" w={230} component={Link} to={paths.Game}>
            <Text color="white" size="lg" weight="600" align="center">
              Игра
            </Text>
          </Menu.Item>
          <Menu.Item
            mt="md"
            bg="brand.3"
            w={230}
            component={Link}
            to={paths.Profile}>
            <Text color="brand.2" size="lg" weight="600" align="center">
              Профиль
            </Text>
          </Menu.Item>
          <Menu.Item
            mt="md"
            bg="brand.3"
            w={230}
            component={Link}
            to={paths.LeaderBoard}>
            <Text color="brand.2" size="lg" weight="600" align="center">
              Лидерборд
            </Text>
          </Menu.Item>
          <Menu.Item
            mt="md"
            bg="brand.3"
            w={230}
            component={Link}
            to={paths.Forum}>
            <Text color="brand.2" size="lg" weight="600" align="center">
              Форум
            </Text>
          </Menu.Item>
        </Menu>
      </Stack>
    </BackgroundImage>
  )
}
