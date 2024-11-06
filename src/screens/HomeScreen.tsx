import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {closeIcon, filterIcon} from '../assets';
import {CLEAN_FILTER, FILTERS} from '../constants';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import {
  clearFilterData,
  deleteExpense,
  updateLocalStorage,
} from '../store/slices/expenses-slice';
import {
  ExpenseSectionType,
  ExpenseType,
  RootStateType,
} from '../constants/types';
import {HIT_SLOP_10} from '../utils';
import {useQuery, useQueryClient} from 'react-query';
import {FilterParamsType} from '../constants/types';

const HomeScreen = () => {
  const filteredExpensesRef = useRef([] as ExpenseType[]);
  const expenses = useSelector(
    (state: RootStateType) => state.expenses.expenses,
  );

  const {openModal} = useModal();
  const dispatch = useDispatch();

  const fetchFilteredExpenses = async (filterParams: FilterParamsType) => {
    // Simulating API call with filtering
    return expenses.filter((expense: ExpenseType) => {
      if (
        filterParams.title &&
        !expense.title.toLowerCase().includes(filterParams.title.toLowerCase())
      ) {
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

  const {data: filteredExpenses} = useQuery(['expenses', {}], () =>
    fetchFilteredExpenses({}),
  );

  const totalAmount =
    filteredExpenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  const handleDeleteExpense = useCallback(
    async (expenseId: string) => {
      dispatch(deleteExpense(expenseId));
    },
    [dispatch],
  );

  const renderExpenseItem = useCallback(
    ({item}: {item: ExpenseType}) => (
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
          <Image source={closeIcon} style={styles.removeIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {}}>
          <Image source={editIcon} style={styles.editIcon} />
        </TouchableOpacity> */}
        <Text style={styles.paymentTitle}>{item.title}</Text>
        <Text style={styles.paymentTitle}>${item.amount}</Text>
      </View>
    ),
    [handleDeleteExpense],
  );

  const renderSectionHeader = useCallback(
    ({section: {title}}: {section: {title: string}}) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    ),
    [],
  );
  // console.log({expenses, filteredExpenses});

  const expenseSections = useMemo(() => {
    filteredExpensesRef.current =
      filteredExpenses?.length > 0 ? filteredExpenses : expenses;

    const sections: ExpenseSectionType[] = [];
    let currentSection: {title: string; data: ExpenseType[]} | null = null;

    filteredExpensesRef.current.forEach(expense => {
      const expenseDate = expense.date;
      if (!currentSection || currentSection.title !== expenseDate) {
        currentSection = {title: expenseDate, data: [expense]};
        sections.push(currentSection);
      } else {
        currentSection.data.push(expense);
      }
    });

    return sections;
  }, [expenses, filteredExpenses]);

  //TODO: optimize
  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topWrapper}>
          <Text style={styles.totalTile}>Total Expenses: {totalAmount}</Text>

          <View style={styles.filterWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => openModal(FILTERS)}>
              <Image source={filterIcon} style={styles.containerIcon} />
              <Text style={styles.filterText}>{FILTERS}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SectionList
          sections={expenseSections}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={Separator}
          renderItem={renderExpenseItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topWrapper: {paddingHorizontal: 16},
  separator: {borderBottomWidth: 0.25},
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 62,
  },
  totalTile: {
    color: COLORS.title,
    paddingRight: 3,
    paddingTop: 19,
    fontWeight: '400',
    fontSize: 17,
  },
  filterWrapper: {
    alignItems: 'flex-end',
    paddingTop: 37,
    paddingBottom: 11,
  },
  containerIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  removeIcon: {width: 20, height: 20, marginRight: 2},
  editIcon: {width: 20, height: 20, marginRight: 10},
  clearFilterButton: {},
  clearFilterText: {
    padding: 10,
    color: COLORS.thirdary,
  },
  filterButton: {
    flexDirection: 'row',
    height: 28,
    marginRight: 11,
    paddingVertical: 4,
    paddingHorizontal: 13,
    backgroundColor: COLORS.filter,
    borderRadius: 60,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.title,
  },
  paymentTitle: {
    color: '#3E3E3E',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 31.5,
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  sectionHeader: {
    color: COLORS.title,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#F4EEEE',
    fontWeight: '400',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
