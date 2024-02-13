import { render, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('Auth Component', () => {
  test('renders Confirm Password', () => {
    // Arrange
    render(<AuthForm />);
    // Act 
    //nothing to act

    //Assert
    const confirm = screen.getByText('Confirm Password');
    expect(confirm).toBeInTheDocument();
  });

  test('renders Sending request', () => {
    render(<AuthForm />);
    const sending = screen.getByText('Sending request',{exact:false});
    expect(sending).toBeInTheDocument();
  });

  test('renders Forgot Password', () => {
    render(<AuthForm />);
    const forget = screen.getByText('Forgot Password',{exact:false});
    expect(forget).toBeInTheDocument();
  });

  test('renders account', () => {
    render(<AuthForm />);
    const account = screen.getByText('Have an account',{exact:false});
    expect(account).toBeInTheDocument();
  });

  test('renders Sign Up', () => {
    render(<AuthForm />);
    const sign = screen.getByTestId('Sign Up');
    expect(sign).toBeInTheDocument();
  });


  test('renders if request succeds', async() => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json:async ()=>{}
    })
    render(<AuthForm />);
    const listItemElements = await screen.findAllByRole('listitem')
    expect(listItemElements).not.tohaveLength(0);
  });

  test('logs in user when form is submitted with correct credentials', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({
        idToken: 'mock-id-token',
        email: 'test@example.com',
      }),
      ok: true,
    });

    render(<AuthForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=your-api-key',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
            returnSecureToken: true,
          }),
        })
      );
      // Additional assertions can be added here to test the login functionality
    });
  });

  test('displays error message if login fails', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({
        error: {
          message: 'Invalid password',
        },
      }),
      ok: false,
    });

    render(<AuthForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/authentication failed/i);
    expect(errorMessage).toBeInTheDocument();
  });


  
});
