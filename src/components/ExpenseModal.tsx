import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {amountStr, createStr, datePH, titleStr} from '../constants';
import {COLORS} from '../constants/theme';
import {HIT_SLOP_10} from '../utils';
import Button from './Button';

interface ExpenseModalProps {
  onClose: () => void;
}

const ExpenseModal: FC<ExpenseModalProps> = ({onClose}) => {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const dispatch = useDispatch();

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showPicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleCreate = () => {};

  const handleConfirm = () => {};

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
          onPress={showPicker}
          hitSlop={HIT_SLOP_10}>
          {date ? (
            <Text style={styles.inputTitle}>{date}</Text>
          ) : (
            <Text style={[styles.inputTitle, {color: COLORS.placeholder}]}>
              {datePH}
            </Text>
          )}
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            style={styles.datePicker}
          />
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
