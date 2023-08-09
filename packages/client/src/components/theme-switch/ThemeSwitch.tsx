import {
  Affix,
  Group,
  rem,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <Affix position={{ top: rem(1), right: rem(1) }}>
      <Group position="right">
        <Switch
          checked={colorScheme === 'dark'}
          onChange={() => toggleColorScheme()}
          size="lg"
          color="yellow"
          onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
          offLabel={
            <IconMoonStars
              color={theme.colors.gray[6]}
              size="1.25rem"
              stroke={1.5}
            />
          }
        />
      </Group>
    </Affix>
  )
}
