import {useQuery} from 'react-query';
import {
  ExpensesStateType,
  ExpenseType,
  FilterParamsType,
} from '../constants/types';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

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

// export const useFilteredExpenses = (filterParams: FilterParamsType) => {
//   const expenses = useSelector((state: RootState) => state.expenses.expenses);

//   return useQuery(
//     ['expenses', filterParams],
//     () => fetchFilteredExpenses(expenses, filterParams),
//     {
//       keepPreviousData: true,
//     },
//   );
// };

export const useFilteredExpenses = (
  filterParams: FilterParamsType,
  // expenses: ExpensesStateType,
): ExpensesStateType => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const fallback: ExpensesStateType | [] = [];
  const {
    isError,
    isLoading,
    data = fallback,
    error,
    isSuccess,
  } = useQuery(['expenses'], () =>
    fetchFilteredExpenses(expenses, filterParams),
  );
  // console.log({isError, isLoading, data, error, isSuccess});
  if (isSuccess && !isError) {
    return {
      data: data as ExpenseType[],
      isLoading,
    };
  }
  return {
    isError,
    isLoading,
    error: error as Error,
  };
};
