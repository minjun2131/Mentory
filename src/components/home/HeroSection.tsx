'use client';

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const HeroSection: React.FC = () => {
  const [searchHashtag, setSearchHashtag] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchHashtag.trim()) return;

    const supabase = createClient();

    const searchQuery = `%${searchHashtag.trim()}%`; // 와일드카드라는걸 추가했는데....이게 맞아??

    const { data: hashtags, error } = await supabase
      .from('hashtags')
      .select('mentor_id')
      .ilike('tag_name', searchQuery);

    if (error) {
      console.error('오류가 발생했습니다.');
      return;
    }

    const mentorId = hashtags?.map((hashtag) => hashtag.mentor_id);

    if (mentorId && mentorId.length > 0) {
      router.push(`/mentor-list?mentorId=${encodeURIComponent(JSON.stringify(mentorId))}`);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '관련된 멘토를 찾을 수 없습니다.',
        text: '다시 시도하거나 다른 멘토를 검색해 주세요.'
      });
    }
  };

  return (
    <section className="relative pb-12">
      <div className="w-full">
        <Image
          src="/images/hero-image.png"
          alt="Hero-Image"
          width={1920}
          height={300}
          className="w-full h-[30vh] sm:h-[500px] object-cover filter brightness-90 blur-[1px] grayscale"
        />
        <div className="absolute inset-0 flex justify-center items-center" style={{ top: '40%' }}>
          <div className="w-[90%] max-w-xl bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center p-3">
            <input
              type="text"
              placeholder="Search for mentors, topics, or more..."
              className="flex-1 bg-transparent outline-none text-gray-700 px-4 text-lg"
              value={searchHashtag}
              onChange={(e) => setSearchHashtag(e.target.value)}
            />
            <button
              className="px-6 py-2 bg-main text-white rounded-full hover:bg-main-hover transition-all"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
