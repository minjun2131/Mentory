"use client"

import React from 'react';
import ModalWrapper from '../../ui/ModalWrapper';
import { useModalStore } from '@/store/modalStore';
import SignupForm from '@/components/auth/forms/SignupForm';

const SignupModal: React.FC = () => {
  const { openModal, close } = useModalStore();

  return (
    <ModalWrapper isOpen={openModal === 'signup'} onClose={close}>
      <SignupForm />
    </ModalWrapper>
  );
};

export default SignupModal;
