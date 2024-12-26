import { create } from 'zustand';

type ModalType = 'login' | 'signup' | null;

interface ModalState {
  openModal: ModalType;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: null,
  open: (type) => set({ openModal: type }),
  close: () => set({ openModal: null })
}));
