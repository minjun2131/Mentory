'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Skeleton from './Skeleton';
import Image from 'next/image';

interface LoggedMentor {
  profile_image: string | null;
  introduction: string | null;
  user_id: string;
}

export const MentorSection: React.FC = () => {
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
  );
};
