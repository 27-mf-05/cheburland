import { render, screen } from '@testing-library/react'

import { Page404 } from './Page404'

const appContent = 'Page 404'

test('Default main page test', async () => {
  render(<Page404 />)
  expect(screen.getByText(appContent)).toBeDefined()
})
