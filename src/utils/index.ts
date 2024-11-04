import {StatusBar} from 'react-native';

export const nameRegex = /^[A-Za-z]{3,20}$/;
export const amountRegex = /^\d+(\.\d{1,2})?$/;
export const HIT_SLOP_10 = {top: 10, left: 10, right: 10, bottom: 10};
export const hightStatusBar = StatusBar.currentHeight || 0;

export const formatDate = (dateFilter: Date): string => {
  const day = dateFilter.getDate();
  const month = dateFilter.getMonth() + 1;
  const year = dateFilter.getFullYear();

  const formatted = `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year.toString()}`;

  return formatted;
};

export const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 20);
