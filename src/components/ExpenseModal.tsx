import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {amountStr, createStr, datePH, titleStr} from '../constants';
import {COLORS} from '../constants/theme';
import {formatDate, HIT_SLOP_10, minDate} from '../utils';
import Button from './Button';

interface ExpenseModalProps {
  onClose: () => void;
}

const ExpenseModal: FC<ExpenseModalProps> = ({onClose}) => {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const showDatePicker = () => setOpen(true);
  const hideDatePicker = () => setOpen(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setFormattedDate(formatDate(selectedDate));
    hideDatePicker();
    console.log('A date has been picked: ', selectedDate);
  };

  const handleCreate = () => {};

  return (
    <>
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
        {open && (
          <>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              style={styles.datePicker}
              maximumDate={new Date()}
              minimumDate={minDate}
            />
          </>
        )}
        <Button text={createStr} onButtonPress={handleCreate} />
      </>
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

export default ExpenseModal;
