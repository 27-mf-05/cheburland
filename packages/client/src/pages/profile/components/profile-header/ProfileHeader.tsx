import { Avatar, SimpleGrid, Title } from '@mantine/core'

import { ImageForm } from '@/components'
import { useAvatar } from '@/hooks'

type ProfileHeaderProps = {
  userName: string
  avatar: string
}
export const ProfileHeader = ({
  userName,
  avatar = '',
}: ProfileHeaderProps): JSX.Element => {
  const { handleChange } = useAvatar()

  return (
    <SimpleGrid cols={1} mb="xl">
      <Avatar
        src={avatar}
        alt="default avatar"
        size={120}
        radius={'50%'}
        mx="auto"
      />
      <Title ta="center" order={3}>
        {userName}
      </Title>

      {/*TODO: just for test. Need to add conditional rendering  */}
      {/* <ImageForm handleChange={handleChange} /> */}
    </SimpleGrid>
  )
}
