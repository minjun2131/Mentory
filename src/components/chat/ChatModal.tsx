'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import Image from 'next/image';
import useChatModalStore from '@/store/chatModalStore';
import { useModalStore } from '@/store/modalStore';
import { getAuthenticatedUser } from '@/lib/profile';

const ChatModal = () => {
  const { isOpen, openModal, closeModal } = useChatModalStore();
  const { open } = useModalStore();
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');
  const [activeChatroomId, setActiveChatroomId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const handleSelectChatroom = (chatroomId: string, userId: string) => {
    setActiveChatroomId(chatroomId); // 선택된 채팅방 ID 설정
    setCurrentUserId(userId); // 현재 사용자 ID
    setActiveTab('room'); // 탭을 'room'으로 전환
  };

  const handleOpenChat = async () => {
    try {
      const user = await getAuthenticatedUser();
      if (!user) {
        open('login');
        return;
      }
      openModal();
    } catch (error) {
      console.log('로그인 확인 중 오류:', error);
      open('login');
    }
  };
  return (
    <>
      {/* 플로팅 채팅 버튼 */}
      <button
        className="fixed bottom-5 right-5 p-4 focus:outline-none"
        onClick={handleOpenChat} // 모달 열기
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
            {/* 채팅 리스트 탭 */}
            {activeTab === 'list' && (
              <button
                className="flex-1 py-2 text-center border-b-2 border-main font-semibold"
                onClick={() => setActiveTab('list')}
              >
                채팅 리스트
              </button>
            )}

            {/* 채팅방 탭 (채팅방에 있을 때만 보이도록) */}
            {activeTab === 'room' && (
              <div className="flex w-full">
                <button
                  className="flex-1 py-2 mr-1 text-center border-b-2 border-gray font-semibold"
                  onClick={() => setActiveTab('list')}
                >
                  채팅 리스트
                </button>
                <button
                  className="flex-1 py-2 ml-1 text-center border-b-2 border-main font-semibold"
                  onClick={() => setActiveTab('room')}
                >
                  채팅방
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden h-[500px]">
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'list' ? (
                <ChatList onSelectChatroom={handleSelectChatroom} />
              ) : (
                <ChatRoom chatroomId={activeChatroomId} userId={currentUserId} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatModal;
