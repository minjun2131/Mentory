'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type ChatRoom = Database['public']['Tables']['chatrooms']['Row'];

const ChatList = ({ onSelectChatroom }: { onSelectChatroom: (id: string) => void }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  // 채팅방 목록 조회
  useEffect(() => {
    const supabase = createClient();
    const fetchChatRooms = async () => {
      const { data, error } = await supabase.from('chatrooms').select('*');
      if (error) {
        console.error('채팅방 목록 불러오기 실패:', error);
      } else {
        setChatRooms(data);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">채팅 리스트</h3>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id} onClick={() => onSelectChatroom(room.id)} className="bg-gray-200 border border-gray-300 rounded-lg p-3 mb-2 cursor-pointer transition duration-300 hover:bg-gray-300">
            {room.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;