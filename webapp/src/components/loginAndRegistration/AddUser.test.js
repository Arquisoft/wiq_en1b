import React from 'react';
import { render, screen } from '@testing-library/react';
import AddUser from './AddUser';
import { BrowserRouter as Router } from 'react-router-dom'; 

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

describe('<AddUser />', () => {
  test('renders the AddUser component', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    expect(screen.getByText('addUser.title')).toBeInTheDocument();
    expect(screen.getByText('addUser.username_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.password_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.repeat_password_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.register_button')).toBeInTheDocument();
    expect(screen.getByText('addUser.login_link')).toBeInTheDocument();

  });
});


