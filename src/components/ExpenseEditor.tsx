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
import {amountStr, createStr, datePH, titleStr} from '../constants';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import useInputValidation from '../hooks/useInputValidation';
import {addExpense} from '../redux/slices/expenses-slice';
import {ExpenseType} from '../redux/types';
import {formatDate, HIT_SLOP_10, minDate} from '../utils';
import Button from './Button';

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
  const {closeModal} = useModal();

  const dispatch = useDispatch();

  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const handleDatePicker = (selectedDate: Date) => {
    setDate(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    hideDatePicker();
    // console.log('A date has been picked: ', selectedDate);
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
        closeModal();
      }
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={titleStr}
        placeholderTextColor={COLORS.placeholder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={amountStr}
        placeholderTextColor={COLORS.placeholder}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.input}
        onPress={showDatePicker}
        hitSlop={HIT_SLOP_10}>
        {formattedDate ? (
          <Text style={styles.inputTitle}>{formattedDate}</Text>
        ) : (
          <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
            {datePH}
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
            style={styles.datePicker}
            maximumDate={new Date()}
            minimumDate={minDate}
          />
        </>
      )}
      <Button text={createStr} onButtonPress={handleCreate} />
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
    marginTop: -64,
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
