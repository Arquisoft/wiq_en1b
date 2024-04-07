import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('Home component', () => {
  test('renders correctly and toggles text container visibility', () => {
   render(
      <Router>
        <Home />
      </Router>
    );
    // The welcome messages must be shown
    expect(screen.getByText('home.msg1')).toBeInTheDocument();
    expect(screen.getByText('home.msg2')).toBeInTheDocument();

    // Click toggle open button
    fireEvent.click(screen.getByTitle("home.clickOpen"));

    // Icons of instructions, login and signup must be shown
    expect(screen.getByAltText('Instructions')).toBeVisible();
    expect(screen.getByAltText('Login')).toBeVisible();
    expect(screen.getByAltText('Add user')).toBeVisible();


    // Click toggle close button
    fireEvent.click(screen.getByTitle('home.clickClose'));

    // The welcome messages must be shown
    expect(screen.getByText('home.msg1')).toBeVisible();
    expect(screen.getByText('home.msg2')).toBeVisible();
  });
});
