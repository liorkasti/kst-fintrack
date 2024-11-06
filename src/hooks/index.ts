import {Platform} from 'react-native';
import {FILTERS} from '../constants';
import {ModalTitle} from '../constants/types';

export const useModalTopPadding = (title: ModalTitle): number =>
  title === FILTERS
    ? Platform.OS === 'ios'
      ? 210
      : 188
    : Platform.OS === 'ios'
    ? 90
    : 60;
