import { Link } from 'react-router-dom'

import { BackgroundImage, Menu, Stack, Text } from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'

import { MenuItems } from './components/MenuItems'

export const Main = (): JSX.Element => {
  const { menuItems } = MenuItems()

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
          {menuItems.map(el => (
            <Menu.Item
              className={el.style}
              bg={el.bg}
              w={230}
              component={Link}
              to={el.to}>
              <Text color={el.color} size="lg" weight="600" align="center">
                {el.title}
              </Text>
            </Menu.Item>
          ))}
        </Menu>
      </Stack>
    </BackgroundImage>
  )
}
