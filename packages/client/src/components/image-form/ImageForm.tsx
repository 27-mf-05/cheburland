import { FC, FormEventHandler } from 'react'

import { FileInput } from '@mantine/core'
import { useForm } from '@mantine/form'

type ImageFormProps = {
  handleChange: FormEventHandler<HTMLFormElement>
}

export const ImageForm: FC<ImageFormProps> = ({ handleChange }) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      avatar: null,
    },
  })

  return (
    <form onChange={handleChange}>
      <FileInput
        placeholder="Выбрать фото"
        variant="unstyled"
        {...form.getInputProps('avatar')}
        accept="image/png, image/jpeg"
      />
    </form>
  )
}
