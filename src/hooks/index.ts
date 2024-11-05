import {Platform} from 'react-native';
import {filtersStr} from '../constants';
import {ModalTitle} from '../redux/types';

export const useModalTopPadding = (title: ModalTitle): number =>
  title === filtersStr
    ? Platform.OS === 'ios'
      ? 210
      : 188
    : Platform.OS === 'ios'
    ? 90
    : 60;
