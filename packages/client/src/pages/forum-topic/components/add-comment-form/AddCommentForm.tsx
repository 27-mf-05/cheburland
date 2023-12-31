import { Button, Flex, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export const AddCommentForm = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      comment: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit(values => console.log(values))}>
      <Flex gap="xs">
        <TextInput
          w="100%"
          placeholder="Введите комментарий..."
          {...form.getInputProps('comment')}
        />
        <Button type="submit">Отправить</Button>
      </Flex>
    </form>
  )
}
