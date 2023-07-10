import { Title } from '@mantine/core'

import { FormWrapper } from '@/components'

import { AddForumTopicForm } from './components'

export const AddForumTopic = (): JSX.Element => {
  return (
    <FormWrapper width={'100vh'} formId="add-forum-topic">
      <Title mb="xl" ta="center">
        Добавить тему
      </Title>
      <AddForumTopicForm />
    </FormWrapper>
  )
}
