import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {AMOUNT, CLEAN, DATE, EDIT, FILTERS, TITLE} from '../constants';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import useInputValidation from '../hooks/useInputValidation';
import {
  addExpense,
  clearFilters,
  filterExpenses,
  setFilterDate,
  setFilterTitle,
  updateExpense,
} from '../store/slices/expenses-slice';
import {formatDate, HIT_SLOP_10, minDate} from '../utils';
import Button from './Button';
import {useQueryClient} from 'react-query';
import {ExpenseType, FilterParamsType} from '../constants/types';
import {queryClient} from '../App';

interface ExpenseEditorProps {}

const ExpenseEditor: FC<ExpenseEditorProps> = () => {
  const {
    title,
    setTitle,
    amount,
    setAmount,
    titleError,
    amountError,
    validateInputs,
  } = useInputValidation();
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [amountFilter, setAmountFilter] = useState<string>('');

  const {modalTitle, closeModal} = useModal();
  const filterFnc = modalTitle === FILTERS;
  const editFnc = modalTitle === EDIT;

  const dispatch = useDispatch();

  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const handleDatePicker = (selectedDate: Date) => {
    setDate(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    hideDatePicker();
  };

  const handleCreate = async () => {
    try {
      if (titleError) {
        Alert.alert(titleError);
      }
      if (amountError) {
        Alert.alert(amountError);
      }
      if (validateInputs() && title && amount && date) {
        const newExpense: ExpenseType = {
          id: Date.now().toString(),
          title,
          amount: parseFloat(amount),
          date: formattedDate,
        };
        //TODO: date validation into hook
        if (date) {
        } else {
          Alert.alert('Invalid date');
        }
        // Saving the expense to AsyncStorage
        const savedExpenses = await AsyncStorage.getItem('expenses');
        let localExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
        localExpenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(localExpenses));

        dispatch(addExpense(newExpense));
        setTitle('');
        setAmount('');
        setFormattedDate('');
        closeModal;
      }
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  const handleEdit = async () => {
    try {
      if (titleError) {
        Alert.alert(titleError);
      }
      if (amountError) {
        Alert.alert(amountError);
      }
      if (validateInputs() && title && amount && date) {
        const newExpense: ExpenseType = {
          id: Date.now().toString(),
          title,
          amount: parseFloat(amount),
          date: formattedDate,
        };
        //TODO: date validation into hook
        if (date) {
        } else {
          Alert.alert('Invalid date');
        }
        // Saving the expense to AsyncStorage
        const savedExpenses = await AsyncStorage.getItem('expenses');
        let localExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
        localExpenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(localExpenses));

        dispatch(updateExpense(newExpense));
        setTitle('');
        setAmount('');
        setFormattedDate('');
        closeModal;
      }
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  const handleFilter = (): void => {
    // dispatch(setFilterTitle(titleFilter));
    // dispatch(setFilterDate(formattedDate));
    // dispatch(filterExpenses());
    // dispatch(clearFilters());

    const filterParams: FilterParamsType = {};
    if (titleFilter) filterParams.title = titleFilter;
    if (formattedDate) filterParams.amount = parseFloat(amountFilter);
    if (formattedDate) filterParams.date = formattedDate;

    queryClient.setQueryData(['expenses', filterParams], filterParams);

    closeModal;
  };

  const onClean = (): void => {
    setTitleFilter('');
    setAmountFilter('');
    setFormattedDate('');
    queryClient.setQueryData(['expenses', {}], {});
    // dispatch(clearFilters());
    closeModal;
  };

  return (
    <>
      <>
        {filterFnc && (
          <TouchableOpacity
            style={styles.cleanButton}
            onPress={onClean}
            hitSlop={HIT_SLOP_10}>
            <Text style={styles.cleanText}>{CLEAN}</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder={TITLE}
          placeholderTextColor={COLORS.placeholder}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder={AMOUNT}
          placeholderTextColor={COLORS.placeholder}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </>

      <TouchableOpacity
        style={styles.input}
        onPress={showDatePicker}
        hitSlop={HIT_SLOP_10}>
        {formattedDate ? (
          <Text style={styles.inputTitle}>{formattedDate}</Text>
        ) : (
          <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
            {DATE}
          </Text>
        )}
      </TouchableOpacity>
      {isDatePickerVisible && (
        <>
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={date}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={hideDatePicker}
            // style={styles.datePicker}
            maximumDate={new Date()}
            minimumDate={minDate}
          />
        </>
      )}
      <Button
        text={modalTitle}
        onButtonPress={
          filterFnc ? handleFilter : editFnc ? handleEdit : handleCreate
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  cleanButton: {
    width: 120,
  },
  cleanText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -46,
    color: COLORS.primary,
  },
  input: {
    borderBottomWidth: 1,
    color: COLORS.title,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
  inputTitle: {
    color: COLORS.inputTitle,
  },
  dateText: {
    color: COLORS.title,
    padding: 10,
    marginBottom: 50,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default ExpenseEditor;
