import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {ExpenseType, FilterParamsType} from '../constants/types';

const fetchFilteredExpenses = (
  expenses: ExpenseType[],
  filterParams: FilterParamsType,
) => {
  return expenses.filter(expense => {
    if (filterParams.title && expense.title !== filterParams.title) {
      return false;
    }
    if (filterParams.amount && expense.amount !== filterParams.amount) {
      return false;
    }
    if (filterParams.date && expense.date !== filterParams.date) {
      return false;
    }
    return true;
  });
};

export const useFilteredExpenses = (filterParams: FilterParamsType) => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  return useQuery(
    ['expenses', filterParams],
    () => fetchFilteredExpenses(expenses, filterParams),
    {
      keepPreviousData: true,
    },
  );
};
