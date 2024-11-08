import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SIGN_OUT, TOTAL_EXPENSES_ITEMS, WELCOME_SCREEN} from '../constants';
import {COLORS} from '../constants/theme';
import {RootStackParamListType, RootStateType} from '../constants/types';
import {persistor} from '../store';
import {clearUser} from '../store/slices/user-slice';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamListType,
    'ProfileScreen'
  >;
};

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const expenses = useSelector(
    (state: RootStateType) => state.expenses.expenses,
  );

  const handleSignout = async () => {
    dispatch(clearUser());
    await persistor.purge();
    navigation.replace(WELCOME_SCREEN);
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalLine}>
        <Text style={styles.text}>{TOTAL_EXPENSES_ITEMS}</Text>
        <Text style={styles.total}>{expenses.length}</Text>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.text}>{SIGN_OUT}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.bkg,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 30,
    fontWeight: '400',
    fontSize: 17,
    color: COLORS.title,
  },
  total: {
    paddingVertical: 30,
    fontWeight: '700',
    fontSize: 17,
    color: COLORS.title,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: -20,
  },
});

export default ProfileScreen;
