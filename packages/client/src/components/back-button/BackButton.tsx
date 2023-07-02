import { useNavigate } from 'react-router-dom'

import { Button } from '@mantine/core'

export const BackButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <Button variant="default" onClick={handleClick}>
      Назад
    </Button>
  )
}
