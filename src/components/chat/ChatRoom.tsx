'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';

type Message = Database['public']['Tables']['messages']['Row'] & { users: User };
type User = Database['public']['Tables']['users']['Row'];

const ChatRoom = ({ chatroomId, userId }: { chatroomId: string | null; userId: string | null }) => {
  const supabase = createClient();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    if (!chatroomId || !userId) return;

    // 채팅방 참여자 정보 조회
    const fetchParticipants = async () => {
      try {
        const { data, error } = await supabase
          .from('chatrooms')
          .select('mentor_id, mentee_id')
          .eq('id', chatroomId)
          .single();

        if (error || !data) {
          console.error('채팅방 정보 불러오기 실패:', error);
          return;
        }

        // 현재 유저와 상대방의 ID 구분
        const otherUserId = data.mentor_id === userId ? data.mentee_id : data.mentor_id;

        // 상대방 정보 가져오기
        const { data: otherUserData, error: otherUserError } = await supabase
          .from('users')
          .select('*')
          .eq('id', otherUserId)
          .single();

        if (otherUserError || !otherUserData) {
          console.error('상대방 정보 불러오기 실패:', otherUserError);
          return;
        }

        // 상태 업데이트
        setOtherUser(otherUserData); // 상대방 정보 저장
      } catch (err) {
        console.error('참여자 정보 조회 실패:', err);
      }
    };

    fetchParticipants();
  }, [chatroomId, userId]);

  useEffect(() => {
    if (!chatroomId) return;

    // 채팅방 메시지 조회
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('messages').select('*, users(*)').eq('chatroom_id', chatroomId).order('created_at', {ascending: true});

      if (error) {
        console.error('메시지 불러오기 실패:', error);
      } else {
        setMessages(data || []);
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
          setMessages((prev) => [...prev, newMessage]);
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
      sender_id: userId,
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
      // 조합 중 아닐때만 메시지 전송
      if (!isComposing) {
        e.preventDefault();
        handleSendMessage();
      } else {
        // 조합 중일 때는 기본 동작 방지
        e.preventDefault();
      }
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.map((message) => (
          <div key={message.id} className="w-full flex flex-col">
            <div className={`max-w-[65%] ${message.sender_id !== userId ? 'self-start' : 'self-end'}`}>
              {message.sender_id !== userId ? (
                <IncomingMessage message={message} otherUser={otherUser} />
              ) : (
                <OutgoingMessage message={message} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
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
