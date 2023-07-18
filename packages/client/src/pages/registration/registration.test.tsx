import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { fireEvent, render } from '@testing-library/react'

import { RegistrationForm } from '@/pages/registration/components'

describe('RegistrationForm', () => {
  it('should be called on valid fields', () => {
    const handleSubmit = jest.fn()

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <RegistrationForm handleSubmit={handleSubmit} />
      </MemoryRouter>
    )

    const firstNameInput = getByLabelText(/имя/i)
    const lastNameInput = getByLabelText(/фамилия/i)
    const loginInput = getByLabelText(/логин/i)
    const emailInput = getByLabelText(/почта/i)
    const passwordInput = getByLabelText(/пароль/i)
    const phoneInput = getByLabelText(/телефон/i)
    const submitButton = getByRole('button', { name: /зарегистрироваться/i })

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(loginInput, { target: { value: 'johndoe' } })
    fireEvent.change(emailInput, { target: { value: 'test@yandex.ru' } })
    fireEvent.change(passwordInput, { target: { value: 'TestTest123' } })
    fireEvent.change(phoneInput, { target: { value: '+79999999999' } })

    fireEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
