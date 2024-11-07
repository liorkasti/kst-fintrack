import React, {createContext, useContext, useState, ReactNode} from 'react';
import {ModalContextType, ModalTitle} from '../constants/types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<ModalTitle>(null);

  const openModal = (title: ModalTitle) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle('Create');
  };

  if (modalTitle) return;
  return (
    <ModalContext.Provider
      value={{isModalOpen, modalTitle, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
