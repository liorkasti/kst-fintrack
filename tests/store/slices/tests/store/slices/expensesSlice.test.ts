import {addExpense} from '../../../../../../src/store/slices/expenses-slice';

describe('expensesSlice', () => {
  const initialState = {expenses: []};

  test('should handle addExpense', () => {
    const expense = {
      id: '1',
      title: 'Groceries',
      amount: 50,
      date: '2024-11-07',
    };
    const action = addExpense(expense);
    const state = expensesReducer(initialState, action);
    expect(state.expenses).toHaveLength(1);
    expect(state.expenses[0]).toEqual(expense);
  });

  test('should handle updateExpense', () => {
    const expense = {
      id: '1',
      title: 'Groceries',
      amount: 50,
      date: '2024-11-07',
    };
    const action = updateExpense(expense);
    const state = expensesReducer({expenses: [expense]}, action);
    expect(state.expenses[0]).toEqual(expense);
  });

  test('should handle removeExpense', () => {
    const expense = {
      id: '1',
      title: 'Groceries',
      amount: 50,
      date: '2024-11-07',
    };
    const action = removeExpense(expense.id);
    const state = expensesReducer({expenses: [expense]}, action);
    expect(state.expenses).toHaveLength(0);
  });
});
function expensesReducer(
  initialState: {expenses: never[]},
  action: {
    payload: import('../../../../../../src/constants/types').ExpenseType;
    type: 'expenses/addExpense';
  },
) {
  throw new Error('Function not implemented.');
}

function expect(expenses: any) {
  throw new Error('Function not implemented.');
}

function updateExpense(expense: {
  id: string;
  title: string;
  amount: number;
  date: string;
}) {
  throw new Error('Function not implemented.');
}

function removeExpense(id: string) {
  throw new Error('Function not implemented.');
}
