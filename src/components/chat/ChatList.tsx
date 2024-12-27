'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ChatRoom = Database['public']['Tables']['chatrooms']['Row'];
type User = Database['public']['Tables']['users']['Row'];

const ChatList = ({ onSelectChatroom }: { onSelectChatroom: (id: string, userId: string) => void }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
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

      // 사용자 정보 조회
      const { data: userData } = await supabase.from('users').select('*');
      if (!userData) {
        console.error('사용자 정보 불러오기 실패');
      } else {
        setUsers(userData);
      }
    };

    fetchChatRooms();
  }, [supabase]);

  //채팅방 이름 생성
  const getChatRoomName = (room: ChatRoom) => {
    const mentor = users.find((user) => user.id === room.mentor_id);
    const mentee = users.find((user) => user.id === room.mentee_id);

    // 현재 사용자가 멘토인 경우
    if (mentor && mentor.id === room.mentor_id) {
      return {
        profileImage: mentee?.profile_image,
        name: `${mentee?.name}님과의 채팅방`
      };
    }
    // 현재 사용자가 멘티인 경우
    else if (mentee && mentee.id === room.mentee_id) {
      return {
        profileImage: mentee?.profile_image,
        name: `${mentor?.name}님과의 채팅방`
      };
    }
    return { profileImage: null, name: '채팅방' };
  };

  return (
    <div className="p-4">
      <ul>
        {chatRooms.map((room) => {
          const { name, profileImage } = getChatRoomName(room);
          return (
            <li
              key={room.id}
              onClick={() => userId && onSelectChatroom(room.id, userId)}
              className="bg-gray-200 border border-gray-300 rounded-lg p-3 mb-2 cursor-pointer transition duration-300 hover:bg-gray-300 flex items-center"
            >
              {profileImage && (
                <Image src={profileImage} alt="Profile" width={40} height={0} className="rounded-full mr-3" />
              )}
              <span>{name}</span>
            </li>
          );
        })}
        {/* {chatRooms.map((room) => (
          <li key={room.id} onClick={() => userId && onSelectChatroom(room.id, userId)}>
            {room.id}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default ChatList;
