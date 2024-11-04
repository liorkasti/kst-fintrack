import {useState} from 'react';
import {Alert} from 'react-native';

export const nameRegex = /^[A-Za-z]{3,20}$/;

const inputsValidation = (input: string) => {
  const [nameError, setNameError] = useState<string>('');

  let isValid = true;

  if (input) {
    if (!nameRegex.test(input.trim())) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    return [isValid, nameError];
  }
};

export default inputsValidation;
