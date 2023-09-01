import { FC, useState } from 'react'

import { CloseButton, Flex, Text } from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'

type fpsCounterProps = {
  fps: string
}

export const FpsCounter: FC<fpsCounterProps> = ({ fps }) => {
  const [fpsShown, setFps] = useState(false)

  const showFps = () => {
    setFps(!fpsShown)
  }

  return (
    <>
      {fpsShown ? (
        <Flex
          sx={theme => ({
            color: theme.colors.gray[4],
            '&:hover': {
              color: theme.colors.gray[9],
              cursor: 'pointer',
            },
          })}>
          <IconAdjustments onClick={showFps}></IconAdjustments>
        </Flex>
      ) : (
        <Flex
          align="center"
          justify="center"
          sx={theme => ({
            color: theme.colors.gray[9],
          })}>
          <CloseButton onClick={showFps} />
          <Text>fps: {fps}</Text>
        </Flex>
      )}
    </>
  )
}
