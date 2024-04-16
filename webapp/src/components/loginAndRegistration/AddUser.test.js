import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUser from './AddUser';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

// Mocking axios to simulate an error response
jest.mock('axios');

describe('<AddUser />', () => {

  beforeEach(() => {
    render(
      <Router>
        <AddUser />
      </Router>
    );
  });

  test('renders the AddUser component', () => {

    expect(screen.getByText('addUser.title')).toBeInTheDocument();
    expect(screen.getByText('addUser.username_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.password_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.repeat_password_placeholder:')).toBeInTheDocument();
    expect(screen.getByText('addUser.register_button')).toBeInTheDocument();
    expect(screen.getByText('addUser.login_link')).toBeInTheDocument();

  });

  const fillFormAndSubmit = (username, password, repeatPassword) => {
    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: username } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: password } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: repeatPassword } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);
  };

  test('displays error message when passwords do not match', () => {
    fillFormAndSubmit('username', '12345678', '123456789');
    expect(screen.getByText('addUser.error_passwords_no_match')).toBeInTheDocument();
  });

  test('displays error message when spaces in password', () => {
    fillFormAndSubmit('username', '1234 5678', '1234 5678');
    expect(screen.getByText('addUser.error_password_spaces')).toBeInTheDocument();
  });

  test('displays error message when passwords too short', () => {
    fillFormAndSubmit('username', '1234567', '1234567');
    expect(screen.getByText('addUser.error_password_minimum_length')).toBeInTheDocument();
  });

  test('displays error message when passwords too long', () => {
    fillFormAndSubmit('username', '01234567890123456789012345678901234567890123456789012345678901234', '01234567890123456789012345678901234567890123456789012345678901234');
    expect(screen.getByText('addUser.error_password_maximum_length')).toBeInTheDocument();
  });

  test('displays error message when spaces in username', () => {
    fillFormAndSubmit('user name', '12345678', '12345678');
    expect(screen.getByText('addUser.error_username_spaces')).toBeInTheDocument();
  });

  test('displays error message when username is already in use', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Username already in use' } } });
    fillFormAndSubmit('existing_user', '12345678', '12345678');
    await waitFor(() => {
      expect(screen.getByText('addUser.error_username_in_use')).toBeInTheDocument();
    });
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), { username: 'existing_user', password: '12345678' });
  });

});


