import { render, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('Auth Component', () => {
  test('renders Confirm Password', () => {
    render(<AuthForm />);
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

  
});
