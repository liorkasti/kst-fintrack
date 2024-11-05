import {useState} from 'react';
import {amountRegex, nameRegex} from '../utils';

const useInputValidation = () => {
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');

  const validateInputs = () => {
    let isValid = true;

    if (name) {
      if (!nameRegex.test(name.trim())) {
        setNameError('Name is required');
        isValid = false;
      } else {
        setNameError('');
      }
      return isValid;
    } else {
      // Title validation
      if (title.trim() === '') {
        setTitleError('Title is required\nPlease enter an expense title');
        isValid = false;
      } else {
        setTitleError('');
      }

      // Amount validation
      if (amount.trim() === '') {
        setAmountError('Amount is required\nPlease enter a number');
        isValid = false;
      } else if (!amountRegex.test(amount.trim())) {
        setAmountError('Invalid amount');
        isValid = false;
      } else {
        setAmountError('');
      }

      return isValid;
    }
  };

  return {
    name,
    setName,
    title,
    setTitle,
    amount,
    setAmount,
    nameError,
    titleError,
    amountError,
    validateInputs,
  };
};

export default useInputValidation;
