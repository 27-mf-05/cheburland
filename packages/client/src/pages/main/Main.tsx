import { Link } from 'react-router-dom'

import { BackgroundImage, Button, Menu, Stack } from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'
import { useRoutes } from '@/hooks'

export const Main = (): JSX.Element => {
  const { paths } = useRoutes()

  return (
    <BackgroundImage id="main" src={bgImage} h="100%">
      <Stack
        align="flex-start"
        justify="flex-start"
        pl="20%"
        pt="10%"
        h="100%"
        sx={{
          background: 'rgba(0,0,0,0.4)',
        }}>
        <Menu width={200}>
          <Button w={230} component={Link} to={paths.Game}>
            Игра
          </Button>
          <Button mt="md" w={230} component={Link} to={paths.Profile}>
            Профиль
          </Button>
          <Button mt="md" w={230} component={Link} to={paths.LeaderBoard}>
            Лидерборд
          </Button>
          <Button mt="md" w={230} component={Link} to={paths.Forum}>
            Форум
          </Button>
        </Menu>
      </Stack>
    </BackgroundImage>
  )
}
