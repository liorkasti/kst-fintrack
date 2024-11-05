import moment from 'moment';
import {ExpenseType} from '../redux/types';

const d1 = moment(new Date(2023, 5, 17)).format('DD.MM.YYYY');
const d2 = moment(new Date(2023, 5, 18)).format('DD.MM.YYYY');
const d3 = moment(new Date(2023, 2, 3)).format('DD.MM.YYYY');
const d4 = moment(new Date(2023, 0, 1)).format('DD.MM.YYYY');

export const dummyExpenses: ExpenseType[] = [
  {id: '1684244219970', title: 'T1', amount: 33, date: d1},
  {id: '1684244219971', title: 'T1', amount: 33, date: d1},
  {id: '1684244219972', title: 'T2', amount: 33, date: d1},
  {id: '1684244219973', title: 'Test', amount: 33, date: d1},
  {id: '1684244219974', title: 'Test', amount: 33, date: d2},
  {id: '1684244219975', title: 'Test', amount: 33, date: d3},
  {id: '1684244219976', title: 'Test', amount: 33, date: d3},
  {id: '1684244779911', title: 'Qwe', amount: 123, date: d4},
  {id: '1684244779912', title: 'Qwe', amount: 123, date: d4},
  {id: '1684244779913', title: 'Qwe', amount: 123, date: d4},
  {
    id: '1684244219970',
    title: 'T1',
    amount: 33.5,
    date: '2023.5.17',
  },
  {
    id: '1684244219971',
    title: 'T1',
    amount: 33,
    date: '2023. 5. 81',
  },
  {
    id: '1684244219972',
    title: 'T2',
    amount: 33,
    date: '2023. 2. 3',
  },
  {
    id: '1684244219973',
    title: 'Test',
    amount: 33,
    date: '2023. 6. 1',
  },
  {
    id: '1684244219970',
    title: 'Some expense 0',
    amount: 484.6,
    date: '27.08.2024',
  },
  {
    id: '1684244219971',
    title: 'Some expense 1',
    amount: 232.37,
    date: '15.10.2024',
  },
  {
    id: '1684244219972',
    title: 'Some expense 2',
    amount: 469.84,
    date: '15.09.2024',
  },
  {
    id: '1684244219973',
    title: 'Some expense 3',
    amount: 431.29,
    date: '22.08.2024',
  },
  {
    id: '1684244219974',
    title: 'Some expense 4',
    amount: 161.2,
    date: '25.08.2024',
  },
];
