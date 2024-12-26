'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const ChatModal = () => {
  // modal 정말 ui만 있어요.. 혜진님 도와주세요
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');

  const [activeChatroomId, setActiveChatroomId] = useState<string | null>(null);

  const toggleModal = () => setIsOpen(!isOpen);
  const switchTab = (tab: 'list' | 'room') => setActiveTab(tab);

  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        className="fixed bottom-5 right-5 p-4 bg-blue-600 text-white rounded-full shadow-lg focus:outline-none"
        onClick={toggleModal}
      >
        💬
      </button>

      {/* 채팅 모달 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleModal} />
        {/* 모달 content */}
        <div className="fixed inset-0 bg-white z-50 flex flex-col h-full md:rounded-lg md:h-auto md:max-w-lg md:mx-auto">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Chat</h2>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={toggleModal}>
              ✖️
            </button>
          </div>

          {/* 탭 */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'list' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => switchTab('list')}
            >
              채팅 리스트
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'room' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => switchTab('room')}
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
        </div>
      </Dialog>
    </>
  );
};

export default ChatModal;
