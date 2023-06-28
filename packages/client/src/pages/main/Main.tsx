import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Stack,
  Tooltip,
} from '@mantine/core'

const gameDescription =
  'Все мы прекрасно знаем, что лучшее лакомство для Чебурашки - это апельсин 🍊. Ваша цель - за минуту собрать как можно больше апельсинов, двигаясь по лабиринту. Апельсин может появляться в рандомном месте.'

export const Main = (): JSX.Element => {
  return (
    <Box id="mainPage" m="-16px">
      <BackgroundImage src="/cheburashka_background.jpg" h="100vh">
        <Center
          p="md"
          h="100%"
          sx={() => ({
            background: 'rgba(0,0,0,0.4)',
          })}>
          <Stack align="flex-start" justify="flex-start" ml="-550px">
            <Button size="lg" bg="brand.2" w={230} component="a" href="/game">
              Начать игру
            </Button>
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
            <Button
              size="lg"
              mt="md"
              variant="light"
              bg="brand.3"
              c="brand.2"
              w={230}
              component="a"
              href="/profile">
              Профиль
            </Button>
            <Button
              size="lg"
              mt="md"
              variant="light"
              bg="brand.3"
              c="brand.2"
              w={230}
              component="a"
              href="/leader-board">
              Лидерборд
            </Button>
            <Button
              size="lg"
              mt="md"
              variant="light"
              bg="brand.3"
              c="brand.2"
              w={230}
              component="a"
              href="/forum">
              Форум
            </Button>
          </Stack>
        </Center>
      </BackgroundImage>
    </Box>
  )
}
