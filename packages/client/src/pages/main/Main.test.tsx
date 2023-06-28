import { render, screen } from '@testing-library/react'

import { Main } from './Main'

const appContent = 'Начать игру'

test('Default main page test', async () => {
  render(<Main />)
  expect(screen.getByRole('button', { name: appContent })).toBeDefined()
})
