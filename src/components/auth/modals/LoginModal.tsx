"use client"

import React from 'react';
import ModalWrapper from '../../ui/ModalWrapper';
import { useModalStore } from '@/app/store/modalStore';
import LoginForm from '@/components/auth/forms/LoginForm';

const LoginModal: React.FC = () => {
  const { openModal, close } = useModalStore();

  return (
    <ModalWrapper isOpen={openModal === 'login'} onClose={close}>
      <LoginForm />
    </ModalWrapper>
  );
};

export default LoginModal;
