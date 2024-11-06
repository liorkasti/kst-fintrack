import {Platform} from 'react-native';
import {FILTERS} from '../constants';

export const useModalTopPadding = (title: string): number =>
  title === FILTERS
    ? Platform.OS === 'ios'
      ? 210
      : 188
    : Platform.OS === 'ios'
    ? 90
    : 60;
