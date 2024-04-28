import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensures custom assertions are available
import RestorePassword from './RestorePassword'; // Path to the component to test

// Mock for useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key) => key, // Simulate translation by returning the key
  }),
}));

describe('RestorePassword Component', () => {
  it('should render the form with all expected fields', () => {
    const mockHandleSubmit = jest.fn(); // Mock for form submission
    const mockHandlePasswordChange = jest.fn();
    const mockShowErrors = jest.fn().mockReturnValue(null); // Simulate no errors

    const { getByText } = render(
      <RestorePassword
        email="test@example.com"
        username="testuser"
        passwordStrength={{ score: 2 }} // Mocked password strength
        passwordStrengthText="addUser.weak_password"
        newPassword="password123"
        handlePasswordChange={mockHandlePasswordChange}
        repeatPassword="password123"
        setRepeatPassword={jest.fn()} // Mock for setting repeatPassword
        handleSubmit={mockHandleSubmit}
        t={(key) => key} // Mock for translation
        showErrors={mockShowErrors}
      />
    );

    // Verify key elements are rendered
    expect(getByText('forgotPassword.enter_password')).toBeInTheDocument();
    expect(getByText(/addUser.password_placeholder/i)).toBeInTheDocument();
    expect(getByText(/addUser.repeat_password_placeholder/i)).toBeInTheDocument();

    // Check if the email and username are read-only and have correct values
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].value).toBe('test@example.com');
    expect(inputs[1].value).toBe('testuser');
  });
  
  it('should call handlePasswordChange on password input change', () => {
    const mockHandlePasswordChange = jest.fn();

    const { container  } = render(
      <RestorePassword
        email="test@example.com"
        username="testuser"
        passwordStrength={{ score: 2 }}
        passwordStrengthText="addUser.weak_password"
        newPassword="password123"
        handlePasswordChange={mockHandlePasswordChange}
        repeatPassword="password123"
        setRepeatPassword={jest.fn()}
        handleSubmit={jest.fn()} // No need to verify handleSubmit here
        t={(key) => key}
        showErrors={jest.fn()}
      />
    );

    // Simulate changing the password input

    const passwordInput = container.querySelector(`input[name="password"]`);
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    const rPasswordInput = container.querySelector(`input[name="repeat_password"]`);
    fireEvent.change(rPasswordInput, { target: { value: 'newPassword' } });
    // Ensure handlePasswordChange was called with the correct argument
    expect(mockHandlePasswordChange).toHaveBeenCalledWith(expect.any(Object)); // Expecting event object
  });
  
  it('should call handleSubmit on form submission', () => {
    const mockHandleSubmit = jest.fn();

    const { getByText } = render(
      <RestorePassword
        email="test@example.com"
        username="testuser"
        passwordStrength={{ score: 2 }}
        passwordStrengthText="addUser.weak_password"
        newPassword="password123"
        handlePasswordChange={jest.fn()}
        repeatPassword="password123"
        setRepeatPassword={jest.fn()}
        handleSubmit={mockHandleSubmit}
        t={(key) => key}
        showErrors={jest.fn()}
      />
    );

    // Simulate form submission
    const form = getByText('forgotPassword.enter_password_button').closest('form');
    fireEvent.submit(form);

    // Verify handleSubmit was called on form submission
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
