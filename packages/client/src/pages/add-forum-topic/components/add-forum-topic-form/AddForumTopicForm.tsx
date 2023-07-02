import { Button, Textarea, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

export const AddForumTopicForm = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      subject: '',
      message: '',
    },
    validate: {
      subject: isNotEmpty('Поле обязательно для заполнения'),
      message: isNotEmpty('Поле обязательно для заполнения'),
    },
  })

  return (
    <form onSubmit={form.onSubmit(values => console.log(values))}>
      <TextInput
        withAsterisk
        label="Тема"
        type="text"
        mb="10px"
        {...form.getInputProps('subject')}
      />
      <Textarea
        withAsterisk
        label="Сообщение"
        mb="10px"
        {...form.getInputProps('message')}
      />
      <Button type="submit">Отправить</Button>
    </form>
  )
}
