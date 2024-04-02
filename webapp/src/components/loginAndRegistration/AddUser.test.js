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


// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import AddUser from './AddUser';

// const mockAxios = new MockAdapter(axios);

// describe('AddUser component', () => {
//   beforeEach(() => {
//     mockAxios.reset();
//   });

//   it('should add user successfully', async () => {
//     render(<AddUser />);

//     const usernameInput = screen.getByLabelText(/Username/i);
//     const passwordInput = screen.getByLabelText(/Password/i);
//     const addUserButton = screen.getByRole('button', { name: /Add User/i });

//     // Mock the axios.post request to simulate a successful response
//     mockAxios.onPost('http://localhost:8000/adduser').reply(200);

//     // Simulate user input
//     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
//     fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

//     // Trigger the add user button click
//     fireEvent.click(addUserButton);

//     // Wait for the Snackbar to be open
//     await waitFor(() => {
//       expect(screen.getByText(/User added successfully/i)).toBeInTheDocument();
//     });
//   });

//   it('should handle error when adding user', async () => {
//     render(<AddUser />);

//     const usernameInput = screen.getByLabelText(/Username/i);
//     const passwordInput = screen.getByLabelText(/Password/i);
//     const addUserButton = screen.getByRole('button', { name: /Add User/i });

//     // Mock the axios.post request to simulate an error response
//     mockAxios.onPost('http://localhost:8000/adduser').reply(500, { error: 'Internal Server Error' });

//     // Simulate user input
//     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
//     fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

//     // Trigger the add user button click
//     fireEvent.click(addUserButton);

//     // Wait for the error Snackbar to be open
//     await waitFor(() => {
//       expect(screen.getByText(/Error: Internal Server Error/i)).toBeInTheDocument();
//     });
//   });
// });
