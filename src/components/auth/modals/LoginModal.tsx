"use client"

import React from 'react';
import ModalWrapper from '../../ui/ModalWrapper';
import { useModalStore } from '@/store/modalStore';
import LoginForm from '@/components/auth/forms/LoginForm';
import GitHubLoginButton from '../buttons/GitHubLoginButton';

const LoginModal: React.FC = () => {
  const { openModal, close } = useModalStore();

  return (
    <ModalWrapper isOpen={openModal === 'login'} onClose={close}>
      <div className='"space-y-4"'>
      <LoginForm />
      <GitHubLoginButton />
      </div>
    </ModalWrapper>
  );
};

export default LoginModal;
