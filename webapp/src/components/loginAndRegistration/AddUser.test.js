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

  const fillForm = (email, username, password, repeatPassword) => {
    const emailInput = screen.getByPlaceholderText('addUser.email_placeholder');
    fireEvent.change(emailInput, { target: { value: email } });

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: username } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: password } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: repeatPassword } });
  };

  const fillFormAndSubmit = (email, username, password, repeatPassword) => {
    fillForm(email, username, password, repeatPassword)

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);
  };

  test('displays correct error messages', async () => {
    //Wrong email format lacks @
    fillFormAndSubmit('userexample.com', 'username', '12345678', '123456789');
    expect(screen.getByText('addUser.error_wrong_email_format')).toBeInTheDocument();
    //Wrong email format lacks domain
    fillFormAndSubmit('user@example', 'username', '12345678', '123456789');
    expect(screen.getByText('addUser.error_wrong_email_format')).toBeInTheDocument();
    //Passwords do not match
    fillFormAndSubmit('user@example.com', 'username', '12345678', '123456789');
    expect(screen.getByText('addUser.error_passwords_no_match')).toBeInTheDocument();
    //Password with spaces
    fillFormAndSubmit('user@example.com', 'username', '1234 5678', '1234 5678');
    expect(screen.getByText('addUser.error_password_spaces')).toBeInTheDocument();
    //Password too short
    fillFormAndSubmit('user@example.com', 'username', '1234567', '1234567');
    expect(screen.getByText('addUser.error_password_minimum_length')).toBeInTheDocument();
    //Password too long
    fillFormAndSubmit('user@example.com', 'username', '01234567890123456789012345678901234567890123456789012345678901234', '01234567890123456789012345678901234567890123456789012345678901234');
    expect(screen.getByText('addUser.error_password_maximum_length')).toBeInTheDocument();
    //Username with spaces
    fillFormAndSubmit('user@example.com', 'user name', 'NvtL+k?qg953tD8', 'NvtL+k?qg953tD8');
    expect(screen.getByText('addUser.error_username_spaces')).toBeInTheDocument();

    //Show various errors
    fillFormAndSubmit('userexample.com', 'user name', '12345678', '12345678');
    expect(screen.getByText('addUser.error_username_spaces')).toBeInTheDocument();
    expect(screen.getByText('addUser.error_wrong_email_format')).toBeInTheDocument();

    //Username in use
    axios.post.mockRejectedValue({ response: { data: { error: 'Username already in use' } } });
    fillFormAndSubmit('user@example.com', 'existing_user', '12345678', '12345678');
    await waitFor(() => {
      expect(screen.getByText('addUser.error_username_in_use')).toBeInTheDocument();
    });
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), { email: 'user@example.com' ,username: 'existing_user', password: '12345678', repeatPassword: "12345678" });
  });

  test('displays correct password strength messages', () => {
    fillForm('user@example.com', 'user name', '123456', '123456');
    expect(screen.getByText(/addUser.very_weak_password/)).toBeInTheDocument();

    fillForm('user@example.com', 'user name', 'Mario12@@', 'Mario12@@');
    expect(screen.getByText(/addUser.weak_password/)).toBeInTheDocument();

    fillForm('user@example.com', 'user name', 'NvtL+k?qg9', 'NvtL+k?qg9');
    expect(screen.getByText(/addUser.good_password/)).toBeInTheDocument();

    fillForm('user@example.com', 'user name', 'NvtL+k?qg953tD8', 'NvtL+k?qg953tD8');
    expect(screen.getByText(/addUser.strong_password/)).toBeInTheDocument();

    fillForm('user@example.com', 'user name', '', '');
    expect(screen.getByText(/addUser.very_weak_password/)).toBeInTheDocument();
  })

});


