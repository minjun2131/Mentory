import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type ChatRoom = Database['public']['Tables']['chatrooms']['Row'];

interface ChatItemProps {
	userId: string;
	room: ChatRoom;	
	onSelectChatroom: (id: string, userId: string) => void
}

const supabase = createClient();

export default function ChatItem({ userId, room, onSelectChatroom }: ChatItemProps) {
	const [chat, setChat] = useState({
		profileImage: "",
		name: "",
	})

	useEffect(() => {
		const getChatinfo = async () => {
			const result = await getChatRoomName(room, userId)
			setChat(result);
		}
		getChatinfo();
	}, [room, userId])

	const getChatRoomName = async (room: ChatRoom, userId: string) => {
		if (room.mentor_id === userId) {
			const { data, error } = await supabase.from('users').select('*').eq('id', room.mentee_id);
			if (error) return { profileImage: "", name: '채팅방' };
			return { profileImage: `${data[0]?.profile_image}`, name: `${data[0]?.name}님과의 채팅방` };
		} else if (room.mentee_id === userId) {
			const { data, error } = await supabase.from('users').select('*').eq('id', room.mentor_id);
			if (error) return { profileImage: "", name: '채팅방' };
			return { profileImage: `${data[0]?.profile_image}`, name: `${data[0]?.name}님과의 채팅방` };
		} 

		return { profileImage: "", name: '채팅방' };
	};
	
	return (
		<li
		key={room.id}
		onClick={() => userId && onSelectChatroom(room.id, userId)}
		className="bg-gray-200 border border-gray-300 rounded-lg p-3 mb-2 cursor-pointer transition duration-300 hover:bg-gray-300 flex items-center"
	>
		{chat.profileImage && (
			<Image src={chat.profileImage} alt="Profile" width={40} height={0} className="rounded-full mr-3" />
		)}
		<span>{chat.name}</span>
	</li>
	)
}