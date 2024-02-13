import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Expense from './Expense';
import { Provider } from 'react-redux';
import store from '../../redux-store/store';



describe('Expense Component', () => {
  test('renders expense list correctly', () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );
    const expenseList = screen.getByTestId('expense-list');
    expect(expenseList).toBeInTheDocument();
  });

  test('renders "Premium" button when total expense amount is greater than 10000', () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );
    const premiumButton = screen.getByRole('button', { name: /premium/i });
    expect(premiumButton).toBeInTheDocument();
  });

  test('dispatches toggleTheme action when "Premium" button is clicked', () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );
    const premiumButton = screen.getByRole('button', { name: /premium/i });
    userEvent.click(premiumButton);
    const currentState = store.getState();
    expect(currentState.theme.darkMode).toBe(true); 
  });

  test('adds new expense when form is submitted', () => {
    render(
      <Provider store={store}>
        <Expense />
      </Provider>
    );
    const amountInput = screen.getByLabelText('Amount');
    userEvent.type(amountInput, '100'); 
    const descriptionInput = screen.getByLabelText('Description');
    userEvent.type(descriptionInput, 'Test Expense');
    const categorySelect = screen.getByLabelText('Choose a Category:');
    userEvent.selectOptions(categorySelect, 'food');
    const submitButton = screen.getByRole('button', { name: /add expense/i });
    userEvent.click(submitButton); 
    const currentState = store.getState();
    expect(currentState.expenseList.expenseListData).toHaveLength(1);
  });

  // Add more test cases here...
});
