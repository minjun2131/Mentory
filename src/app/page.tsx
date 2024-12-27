'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';
import ChatModal from '@/components/chat/ChatModal';

const Skeleton = () => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-200 animate-pulse">
      {/* 이미지 부분 */}
      <div className="w-full h-[300px] bg-gray-300"></div>
      {/* 텍스트 부분 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="bg-gray-400 h-5 w-3/4 rounded"></div>
      </div>
    </div>
  );
};

const CommunitySection: React.FC = () => {
  const router = useRouter();
  const { open } = useModalStore();

  const handleJoinClick = async () => {
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      router.push('/mentor-list');
    } else {
      open('signup');
    }
  };

  return (
    <section className="py-12 bg-[#F6F6F6] px-10 lg:px-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="text-left flex-1">
          <h3 className="text-3xl font-extrabold mb-6">Enjoy our community</h3>
          <p className="text-xl mb-8 font-medium">Let&apos;s be together and grow together</p>
          <button
            onClick={handleJoinClick}
            className="w-[200px] py-4 bg-[#D9D9D9] text-black rounded-full text-xl font-bold hover:bg-gray-400 shadow-md transition-colors"
          >
            Join
          </button>
        </div>
        <div className="flex-shrink-0 ml-8">
          <Image
            src="/images/logo.png"
            alt="Mentory_Logo"
            width={500}
            height={80}
            className="w-[200px] sm:w-[300px] lg:w-[500px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

interface LoggedMentor {
  profile_image: string | null;
  introduction: string | null;
  user_id: string;
}

export default function Home() {
  const [mentors, setMentors] = useState<LoggedMentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      const supabase = createClient();

      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data: mentorsData, error: mentorsError } = await supabase
        .from('mentors')
        .select('profile_image, introduction, user_id')
        .order('created_at', { ascending: true })
        .limit(4);

      if (mentorsError) {
        console.error('멘토 데이터 가져오기 실패');
      } else {
        const filteredMentors = user ? mentorsData?.filter((mentor) => mentor.user_id !== user.id) : mentorsData; // 로그아웃 상태: 모두 보여줌

        setMentors(filteredMentors || []);
      }
      setLoading(false);
    };

    fetchMentors();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/*히어로 섹션*/}
        <section className="relative py-12">
          <div className="w-full">
            <Image
              src="/images/hero-image.png"
              alt="Hero-Image"
              width={1920}
              height={300}
              className="w-full h-[30vh] sm:h-[300px] object-cover filter brightness-90 blur-[1px]"
            />
          </div>
        </section>

        {/* 아워 멘토 섹션 */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold mb-6">Our Mentors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? Array(4)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} />)
                : mentors.map((mentor, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={mentor.profile_image || '/images/profile.png'}
                        alt="Mentor-Profile"
                        width={300}
                        height={300}
                        className="w-full h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm">{mentor.introduction}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        <CommunitySection />
        <ChatModal />
      </div>
    </>
  );
}
