'use client';

import ChatModal from '@/components/chat/ChatModal';
import useModalStore from '@/store/chatModalStore';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

const MentorDetail = () => {
  const supabase = createClient();
  const params = useParams();
  const { openModal } = useModalStore();

  const handleCreateChatroom = async () => {
    try {
      // 로그인한 유저의 세션 정보 가져오기
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session || !session.user) {
        alert('로그인 상태가 아닙니다.');
        return;
      }

      const menteeId = session.user.id; // 로그인된 유저의 ID
      const mentorId = params.id; // 현재 페이지의 멘토 ID 필요

      // 이미 존재하는 채팅방 확인
      const { data: existingChatroom } = await supabase
        .from('chatrooms')
        .select('*')
        .eq('mentor_id', mentorId)
        .eq('mentee_id', menteeId)
        .single();

      if (existingChatroom) {
        alert('이미 존재하는 채팅방입니다.');
        return;
      }

      // Supabase에 채팅방 생성
      const { error: insertError } = await supabase
        .from('chatrooms')
        .insert([{ mentor_id: mentorId, mentee_id: menteeId }]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      // 채팅 모달 열기
      openModal();
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error);
      alert('채팅방 생성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pt-[100px] pb-[100px]">
      {/* Header Section */}
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">
            문다슬 <span>Mentor</span>
          </h1>

          <p className="text-gray-600">FrontEnd 엔지니어</p>
          <button
            onClick={handleCreateChatroom}
            className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            1:1 대화하기
          </button>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-700">안녕하세요 저는 프론트엔드 엔지니어 문다슬입니다</p>
      </div>

      {/* Experience Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <ul className="space-y-2">
          {Array(5)
            .fill('2024.10.01 ~ 2025.02.28')
            .map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.151-6 5.847 1.416 8.167L12 18.897l-7.284 3.786 1.416-8.167-6-5.847 8.2-1.151z" />
                </svg>
              ))}
          </div>
          <span className="text-gray-600">(5/5)</span>
        </div>
      </div>
      <ChatModal />
    </div>
  );
};

export default MentorDetail;
