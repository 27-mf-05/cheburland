import { Link } from 'react-router-dom'

import {
  BackgroundImage,
  Box,
  Button,
  Menu,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'

import { gameDescription } from './constants'

export const Main = (): JSX.Element => {
  return (
    <Box id="mainPage" m="-16px">
      <BackgroundImage src={bgImage} h="100vh">
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
            <Menu.Item bg="brand.2" w={230} component={Link} to="/game">
              <Text color="white" size="lg" weight="600" align="center">
                Начать игру
              </Text>
            </Menu.Item>
            <Menu.Item
              mt="md"
              bg="brand.3"
              w={230}
              component={Link}
              to="/profile">
              <Text color="brand.2" size="lg" weight="600" align="center">
                Профиль
              </Text>
            </Menu.Item>
            <Menu.Item
              mt="md"
              bg="brand.3"
              w={230}
              component={Link}
              to="/leader-board">
              <Text color="brand.2" size="lg" weight="600" align="center">
                Лидерборд
              </Text>
            </Menu.Item>
            <Menu.Item
              mt="md"
              bg="brand.3"
              w={230}
              component={Link}
              to="/forum">
              <Text color="brand.2" size="lg" weight="600" align="center">
                Форум
              </Text>
            </Menu.Item>
          </Menu>
          <Tooltip
            label={gameDescription}
            bg="brand.0"
            withArrow
            multiline
            width={350}>
            <Button
              size="lg"
              mt="md"
              variant="light"
              bg="brand.3"
              c="brand.2"
              w={230}>
              Описание игры
            </Button>
          </Tooltip>
        </Stack>
      </BackgroundImage>
    </Box>
  )
}
