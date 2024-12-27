'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type Message = Database['public']['Tables']['messages']['Row'];

const ChatRoom = ({ chatroomId, userId }: { chatroomId: string | null; userId: string | null }) => {
  const supabase = createClient();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!chatroomId) return;

    // 채팅방의 메시지 조회
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*, users(*)').eq('chatroom_id', chatroomId);
      if (error) {
        console.error('메시지 불러오기 실패:', error);
      } else {
        setMessages(data);
      }
    };
    fetchMessages();

    // Supabase Realtime 구독 설정
    const channel = supabase
      .channel(`messages:chatroom_id=eq.${chatroomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chatroom_id=eq.${chatroomId}` },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]); // 새 메시지 추가
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatroomId]);

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!message.trim() || !userId || !chatroomId) return;

    const { error } = await supabase.from('messages').insert({
      chatroom_id: chatroomId,
      sender_id: userId, // 현재 로그인한 사용자 ID
      content: message
    });

    if (error) {
      console.error('메시지 전송 실패:', error);
    } else {
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="p-2 mb-3 rounded-lg bg-blue-500 text-white self-end">
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-main text-white rounded-lg focus:outline-none">
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
