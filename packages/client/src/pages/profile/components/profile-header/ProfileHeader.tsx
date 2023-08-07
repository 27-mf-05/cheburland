import { Avatar, SimpleGrid, Title } from '@mantine/core'
import { modals, ModalsProvider } from '@mantine/modals'

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
  const handleClick = () => {
    modals.open({
      children: <ImageForm handleChange={handleChange} />,
      centered: true,
    })
  }

  return (
    <ModalsProvider>
      <SimpleGrid cols={1} mb="xl">
        <Avatar
          src={avatar}
          alt="default avatar"
          size={120}
          radius={'50%'}
          mx="auto"
          onClick={handleClick}
          sx={{
            '&:hover': {
              cursor: 'pointer',
              opacity: 0.9,
            },
          }}
        />
        <Title ta="center" order={3}>
          {userName}
        </Title>
      </SimpleGrid>
    </ModalsProvider>
  )
}
