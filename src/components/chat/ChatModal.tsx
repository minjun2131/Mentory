'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import useModalStore from '@/store/chatModalStore';
import Image from 'next/image';

const ChatModal = () => {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');
  const [activeChatroomId, setActiveChatroomId] = useState<string | null>(null);

  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        className="fixed bottom-5 right-5 p-4 focus:outline-none"
        onClick={openModal} // 모달 열기
      >
        <Image src="/images/chat.png" alt="Mentory_Chat_Logo" width={60} height={60} className="cursor-pointer" />
      </button>

      {/* 채팅 모달 */}
      <Dialog open={isOpen} onOpenChange={(open) => (open ? openModal() : closeModal())}>
        <DialogContent>
          {/* 모달 헤더 */}
          <DialogHeader>
            <DialogTitle>
              <Image src="/images/logo.png" alt="Mentory_Logo" width={170} height={70} className="cursor-pointer" />
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-between p-2 border-b">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal} // 닫기 버튼
            />
          </div>

          {/* 탭 */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'list' ? 'border-b-2 border-main font-semibold' : ''
              }`}
              onClick={() => setActiveTab('list')}
            >
              채팅 리스트
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'room' ? 'border-b-2 border-main font-semibold' : ''
              }`}
              onClick={() => setActiveTab('room')}
            >
              채팅방
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden" style={{ height: '400px' }}>
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'list' ? (
                <ChatList onSelectChatroom={setActiveChatroomId} />
              ) : (
                <ChatRoom chatroomId={activeChatroomId} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatModal;
