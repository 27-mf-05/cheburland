import { FC, FormEventHandler } from 'react'

import { FileInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconUpload } from '@tabler/icons-react'

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
        placeholder="Выберите файл jpg/png"
        {...form.getInputProps('avatar')}
        accept="image/png, image/jpeg"
        icon={<IconUpload size="14px" />}
      />
    </form>
  )
}
