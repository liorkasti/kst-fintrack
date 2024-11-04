import {Platform} from 'react-native';
import {filtersStr} from '../constants';

export const useModalTopPadding = (title: string): number =>
  title === filtersStr
    ? Platform.OS === 'ios'
      ? 210
      : 188
    : Platform.OS === 'ios'
    ? 90
    : 60;
