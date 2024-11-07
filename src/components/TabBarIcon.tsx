import React from 'react';
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {plusIcon} from '../assets';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import ExpenseEditor from './ExpenseEditor';
import ExpenseModal from './ExpenseModal';

export const TabBarIcon: React.FC = () => {
  const {openModal} = useModal();

  return (
    <View>
      <TouchableOpacity onPress={() => openModal('Create')}>
        <View style={styles.iconContainer}>
          <Image source={plusIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>

      <ExpenseModal>
        <ExpenseEditor />
      </ExpenseModal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 80 : 50,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
});

export default React.memo(TabBarIcon);
