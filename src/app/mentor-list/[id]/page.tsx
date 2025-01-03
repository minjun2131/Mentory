'use client';

import ChatModal from '@/components/chat/ChatModal';
import LoadingSpinner from '@/components/LoadingAnimation';
import { useMentorCareers } from '@/hooks/useMentorCareers';
import { useMentorInfo } from '@/hooks/useMentorInfo';
import { useUserInfo } from '@/hooks/useUserInfo';
import { getAuthenticatedUser } from '@/lib/profile';
import useChatModalStore from '@/store/chatModalStore';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

const MentorDetail = () => {
  const supabase = createClient();
  const params = useParams();
  const { openModal } = useChatModalStore();
  const { open } = useModalStore();

  const checkAuthentication = async () => {
    try {
      const user = await getAuthenticatedUser();

      if (!user) {
        open('login');
        return false;
      }

      return true;
    } catch (error) {
      console.error('로그인 오류:', error);
      open('login');
      return false;
    }
  };

  const handleCreateChatroom = async () => {
    try {
      const isAuthenticated = await checkAuthentication();

      if (!isAuthenticated) {
        return; // 로그인되지 않았으면 진행하지 않고 return
      }

      // 로그인한 유저의 세션 정보 가져오기
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session || !session.user) {
        Swal.fire({
          icon: 'error',
          title: '로그인 상태가 아닙니다.',
          text: '로그인 후 이용해주세요.'
        });
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
        Swal.fire({
          icon: 'warning',
          title: '이미 존재하는 채팅방입니다.',
          text: '다른 이름의 채팅방을 시도해주세요.'
        });
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
      Swal.fire({
        icon: 'error',
        title: '채팅방 생성에 실패했습니다.',
        text: '다시 시도해주세요.'
      });
    }
  };

  const { data: mentorInfo, isPending, isError } = useMentorInfo();
  const { data: mentorCareer, isPending: isCareerPending } = useMentorCareers();
  const { data: userInfo, isPending: isUserPending } = useUserInfo();

  if (isPending || isCareerPending || isUserPending) {
    return <LoadingSpinner/>;
  }

  if (isError) {
    return <div>프로필을 가져오는 데 실패했습니다.</div>;
  }

  if (!mentorInfo) {
    return <div>프로필 데이터가 존재하지 않습니다.</div>;
  }
  const imageUrl = mentorInfo.profile_image || '/default-profile-image.jpg';

  const careers = Array.isArray(mentorCareer) && mentorCareer.length > 0 ? mentorCareer[0] : null;
  return (
    <div className="max-w-4xl mx-auto p-8 pt-[100px] pb-[100px]">
      {/* Header Section */}
      <div className="flex items-center space-x-6">
        <Image
          src={imageUrl || '/default-image.jpg'}
          alt="Mentor_Image"
          width={96}
          height={96}
          className="object-cover w-40 h-40 rounded-full"
        />

        <div className="w-1/2">
          <h1 className="text-2xl font-bold">
            {userInfo.name} <span>Mentor</span>
          </h1>

          <p className="text-gray-600">{careers.role}</p>
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
        <p className="text-gray-700">{careers.duty}</p>
      </div>

      {/* Experience Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <ul className="space-y-2">
          <li className="text-gray-700">
            {careers.company_name} : {careers.duration_start} ~ {careers.duration_end}
          </li>
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
