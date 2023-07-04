import { Container, Title } from '@mantine/core'

import { AddForumTopicForm } from './components'

export const AddForumTopic = (): JSX.Element => {
  return (
    <Container size="xl">
      <Title mb="xl" ta="center">
        Добавить тему
      </Title>
      <AddForumTopicForm />
    </Container>
  )
}
