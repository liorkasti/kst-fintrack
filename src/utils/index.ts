import {StatusBar} from 'react-native';

export const nameRegex = /^[A-Za-z]{3,20}$/;
export const HIT_SLOP_10 = {top: 10, left: 10, right: 10, bottom: 10};
export const hightStatusBar = StatusBar.currentHeight || 0;
