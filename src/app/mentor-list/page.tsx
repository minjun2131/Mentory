'use client';

import { useMentorProfile } from '@/hooks/useMentorProfile';
import Image from 'next/image';
import Link from 'next/link';

const Mentors = () => {
  // 가상 데이터
  const { data, isPending, isError } = useMentorProfile();

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>프로필을 가져오는 데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>프로필 데이터가 존재하지 않습니다.</div>;
  }
  const mentors = Array.isArray(data) && data.length > 0 ? data : [];
  console.log(mentors);
  if (!mentors) {
    return <div>멘토 데이터를 가져올 수 없습니다.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 배경 이미지 섹션 */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image.jpg')" }} // 이미지 경로 수정 필요
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Our Mentors</h1>
        </div>
      </div>

      {/* 멘토 카드 섹션 */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mentors.map(
            (mentor) => (
              console.log(mentor),
              (
                <div key={mentor.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                  {/* 프로필 이미지 */}
                  <div className="w-full h-40 bg-gray-300 rounded-md">
                    <Image
                      src={mentor.profile_image || '/default-image.jpg'}
                      alt="Mentor_Image"
                      width={96}
                      height={96}
                      className="object-cover w-full h-40"
                    />
                  </div>
                  {/* 내용 */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-700">{mentor.introduction}</h3>
                  </div>
                  {/* 채팅 버튼 */}
                  <div className="mt-4">
                    <Link
                      href={`/mentors/${1}`}
                      className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md w-full hover:bg-blue-600"
                    >
                      Show 💬
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
