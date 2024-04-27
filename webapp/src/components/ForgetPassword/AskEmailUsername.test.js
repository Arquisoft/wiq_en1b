import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensures custom assertions work
import AskEmailUsername from './AskEmailUsername'; // Path to the component to be tested

// Mock for useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key) => key, // Simulate translation by returning the key
  }),
}));

// Test for the component
describe('AskEmailUsername Component', () => {
  it('should render the form with email and username inputs', () => {
    const mockHandleSubmit = jest.fn();
    const mockShowErrors = jest.fn().mockReturnValue(null); // Simulate no errors

    const { getByText, getByPlaceholderText } = render(
      <AskEmailUsername
        email=""
        setEmail={jest.fn()} // You can use mocks if you don't need to verify changes
        username=""
        setUsername={jest.fn()}
        t={(key) => key} // Mock for translation
        handleSubmit={mockHandleSubmit}
        showErrors={mockShowErrors}
      />
    );

    // Verify that the title and inputs are rendered
    expect(getByText('forgotPassword.enter_email')).toBeInTheDocument();
    expect(getByPlaceholderText('addUser.email_placeholder')).toBeInTheDocument();
    expect(getByPlaceholderText('addUser.username_placeholder')).toBeInTheDocument();

    // Simulate the submit event
    const form = getByText('forgotPassword.enter_email_button').closest('form');
    fireEvent.submit(form);

    // Verify that handleSubmit is called
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should call setEmail and setUsername on input change', () => {
    const mockSetEmail = jest.fn();
    const mockSetUsername = jest.fn();

    const { getByPlaceholderText } = render(
      <AskEmailUsername
        email=""
        setEmail={mockSetEmail}
        username=""
        setUsername={mockSetUsername}
        t={(key) => key}
        handleSubmit={jest.fn()} // No need to verify handleSubmit here
        showErrors={jest.fn()}
      />
    );

    // Simulate input change for email and username
    const emailInput = getByPlaceholderText('addUser.email_placeholder');
    const usernameInput = getByPlaceholderText('addUser.username_placeholder');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    // Verify that setEmail and setUsername were called with correct values
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockSetUsername).toHaveBeenCalledWith('testuser');
  });
});
