import {useState} from 'react';
import {nameRegex} from '../utils';

const useInputValidation = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [nameError, setNameError] = useState('');
  const [titleError, setTitleError] = useState('');

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
    validateInputs,
  };
};

export default useInputValidation;
