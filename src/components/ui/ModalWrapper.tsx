import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative overflow-y-auto"
        style={{
          maxHeight: '90vh'
        }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
