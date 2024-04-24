import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom'; 
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Mocking useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

const mockAxios = new MockAdapter(axios);

describe('<Login />', () => {
  it('renders the Login component', () => {
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

  it('sends a correct log in petition', async () => {
    mockAxios.onPost('http://localhost:8000/login').reply(200, { token: "token", username: "username"});

    render(
      <Router>
        <Login />
      </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('login.username_placeholder'), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText('login.password_placeholder'), { target: { value: 'j' } });
  fireEvent.click(screen.getByText('login.login_button'));

  // Wait for redirection to happen
  await waitFor(() => {
    expect(window.location.pathname).toBe('/menu');
  });

  });
});
