import React from 'react';
import ModalWrapper from './ModalWrapper';
import { useModalStore } from '@/app/store/modalStore';
import SignupForm from '@/app/auth/signup/SignupForm';

const SignupModal: React.FC = () => {
  const { openModal, close } = useModalStore();

  return (
    <ModalWrapper isOpen={openModal === 'signup'} onClose={close}>
      <SignupForm />
    </ModalWrapper>
  );
};

export default SignupModal;
