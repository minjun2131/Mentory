'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type ChatRoom = Database['public']['Tables']['chatrooms']['Row'];

const ChatList = ({ onSelectChatroom }: { onSelectChatroom: (id: string, userId: string) => void }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  // 채팅방 목록 조회
  useEffect(() => {
    const fetchChatRooms = async () => {
      // 세션 가져오기
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('세션 가져오기 실패:', error);
        return;
      }

      if (!session || !session.user) {
        console.error('로그인되지 않은 상태입니다.');
        return;
      }

      // 로그인된 유저 정보
      const user = session.user;
      setUserId(user.id);

      // 유저가 속한 채팅방 조회
      const { data, error: fetchError } = await supabase
        .from('chatrooms')
        .select('*')
        .or(`mentor_id.eq.${user.id},mentee_id.eq.${user.id}`);

      if (fetchError) {
        console.error('채팅방 목록 불러오기 실패:', fetchError);
      } else {
        setChatRooms(data);
      }
    };

    fetchChatRooms();
  }, [supabase]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">채팅 리스트</h3>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id} onClick={() => userId && onSelectChatroom(room.id, userId)}>
            {room.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
