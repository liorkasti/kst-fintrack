import React, {FC} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {closeIcon} from '../assets';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import {useModalTopPadding} from '../hooks';
import {hightStatusBar, HIT_SLOP_10} from '../utils';
import {filtersStr} from '../constants';

type ExpenseModalProps = {
  children: React.ReactNode;
};

const ExpenseModal: FC<ExpenseModalProps> = ({children}) => {
  const {isModalOpen, modalTitle, closeModal} = useModal();
  const modalTopPadding = useModalTopPadding(modalTitle);

  if (!isModalOpen) return null;

  return (
    <Modal
      visible={isModalOpen}
      onRequestClose={closeModal}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.container,
          {paddingTop: modalTopPadding + hightStatusBar},
        ]}>
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.modalTitle,
              {marginTop: modalTitle === filtersStr ? -20 : 0},
            ]}>
            {modalTitle}
          </Text>
          <TouchableOpacity
            hitSlop={HIT_SLOP_10}
            style={styles.closeButton}
            onPress={closeModal}>
            <Image source={closeIcon} style={styles.image} />
          </TouchableOpacity>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  modalTitle: {
    color: COLORS.title,
    fontSize: 18,
    fontWeight: '400',
    margin: 26,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.bkg,
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.text,
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default ExpenseModal;
