import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  expect(screen.getByText('navBar.title')).toBeInTheDocument();
  expect(screen.getByText('navBar.language')).toBeInTheDocument();
  expect(screen.getByAltText('App logo')).toBeInTheDocument();
  expect(screen.getByAltText('Help')).toBeInTheDocument();
});
