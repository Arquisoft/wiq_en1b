import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom'; 

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('<Login />', () => {
  test('renders the Login component', () => {
    render(
        <Router>
          <Login />
        </Router>
    );

    expect(screen.getByText('login.title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.username_placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.password_placeholder')).toBeInTheDocument();
    expect(screen.getByText('login.login_button')).toBeInTheDocument();
    expect(screen.getByText('login.register_link')).toBeInTheDocument();
  });
});
