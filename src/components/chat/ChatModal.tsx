'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import useModalStore from '@/store/chatModalStore';

const ChatModal = () => {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');
  const [activeChatroomId, setActiveChatroomId] = useState<string | null>(null);

  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        className="fixed bottom-5 right-5 p-4 bg-blue-600 text-white rounded-full shadow-lg focus:outline-none"
        onClick={openModal} // 모달 열기
      >
        💬
      </button>

      {/* 채팅 모달 */}
      <Dialog open={isOpen} onOpenChange={(open) => (open ? openModal() : closeModal())}>
        <DialogContent>
          {/* 모달 헤더 */}
          <DialogHeader>
            <DialogTitle>Chat</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between p-4 border-b">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal} // 닫기 버튼
            />
          </div>

          {/* 탭 */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'list' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => setActiveTab('list')}
            >
              채팅 리스트
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'room' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => setActiveTab('room')}
            >
              채팅방
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'list' ? (
              <ChatList onSelectChatroom={setActiveChatroomId} />
            ) : (
              <ChatRoom chatroomId={activeChatroomId} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatModal;
