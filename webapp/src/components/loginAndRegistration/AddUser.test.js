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

  test('displays error message when passwords do not match', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'username' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '123456789' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    expect(screen.getByText('addUser.error_passwords_no_match')).toBeInTheDocument();
  });

  test('displays error message when spaces in password', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'username' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '1234 5678' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '1234 5678' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    expect(screen.getByText('addUser.error_password_spaces')).toBeInTheDocument();
  });

  test('displays error message when passwords too short', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'username' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '1234567' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    expect(screen.getByText('addUser.error_password_minimum_length')).toBeInTheDocument();
  });

  test('displays error message when passwords too long', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'username' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '01234567890123456789012345678901234567890123456789012345678901234' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '01234567890123456789012345678901234567890123456789012345678901234' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    expect(screen.getByText('addUser.error_password_maximum_length')).toBeInTheDocument();
  });

  test('displays error message when spaces in username', () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'user name' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '12345678' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    expect(screen.getByText('addUser.error_username_spaces')).toBeInTheDocument();
  });

  test('displays error message when username is already in use', async () => {

    // Mock axios post method to simulate response for username already in use
    axios.post.mockRejectedValue({ response: { data: { error: 'Username already in use' } } });

    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('addUser.username_placeholder');
    fireEvent.change(usernameInput, { target: { value: 'existing_user' } });

    const passwordInput = screen.getByPlaceholderText('addUser.password_placeholder');
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    const repeatPasswordInput = screen.getByPlaceholderText('addUser.repeat_password_placeholder');
    fireEvent.change(repeatPasswordInput, { target: { value: '12345678' } });

    const submitButton = screen.getByText('addUser.register_button');
    fireEvent.click(submitButton);

    // Wait for the asynchronous axios call to be completed
    await waitFor(() => {
      expect(screen.getByText('addUser.error_username_in_use')).toBeInTheDocument();
    });

    // Ensure axios.post is called with the correct data
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), { username: 'existing_user', password: '12345678' });

  });

});


