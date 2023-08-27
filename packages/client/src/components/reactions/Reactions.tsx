import { FC, useState } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Flex, Paper, Popover, Text } from '@mantine/core'

import { useReaction } from '@/hooks'
import { useAppSelector } from '@/hooks/useAppSelector'

import emojis from './emojis.json'

library.add(faCirclePlus)

export const Reactions: FC<{ commentId: number }> = ({ commentId }) => {
  const { handleAddReactionToComment, handleGetReactionToComment } =
    useReaction()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useAppSelector(state => state.user.currentUser)!
  const userId = user.id

  const reactions = handleGetReactionToComment({ commentId })
  const reactionsKeys = reactions ? Object.keys(reactions) : []
  const [emojisKeys, setEmojisKeys] = useState(reactionsKeys)

  const addReaction = (emojiName: string) => {
    const currentReactions = handleAddReactionToComment({
      commentId,
      emojiName,
      userId,
    })
    const newKeys = currentReactions ? Object.keys(currentReactions) : []
    setEmojisKeys(newKeys)
  }

  return (
    <Flex justify="flex-end" align="center" h="26px">
      {emojisKeys.map(emoji => {
        const currentEmoji = emojis.find(e => e.name === emoji)
        const reactionsCount = reactions && reactions[emoji].length
        if (currentEmoji) {
          return (
            <Paper key={emoji} radius="xl" withBorder mr="8px">
              <Flex align="center" p="2px 6px">
                <Text>{currentEmoji.icon}</Text>
                <Text ml="6px" fz="sm">
                  {reactionsCount}
                </Text>
              </Flex>
            </Paper>
          )
        }
      })}

      <Popover width={200} withArrow shadow="md">
        <Popover.Target>
          <Button variant="subtle" size="xs" compact>
            <FontAwesomeIcon icon="circle-plus" />
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          {emojis.map(emoji => {
            return (
              <Button
                key={emoji.name}
                variant="subtle"
                size="xs"
                compact
                onClick={() => addReaction(emoji.name)}>
                <Text>{emoji.icon}</Text>
              </Button>
            )
          })}
        </Popover.Dropdown>
      </Popover>
    </Flex>
  )
}
