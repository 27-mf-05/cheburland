import { Main } from './Main';
import { render, screen } from '@testing-library/react';

const appContent = 'Main Page';

test('Default main page test', async () => {
  render(<Main />);
  expect(screen.getByText(appContent)).toBeDefined();
});
