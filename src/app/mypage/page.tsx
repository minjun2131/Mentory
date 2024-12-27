'use client';

import React from 'react';
import { useUserProfile } from './_hooks/useUserProfile';
import Link from 'next/link';
import ProfileImage from './_components/ProfileImage';

const MyPage = () => {
  const { data, isPending, isError } = useUserProfile();

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>프로필을 가져오는 데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>프로필 데이터가 존재하지 않습니다.</div>;
  }
  const user = Array.isArray(data) && data.length > 0 ? data[0] : null;

  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* 프로필 아이콘 */}
      <div className="flex flex-col items-center mb-6">
        <ProfileImage user={user} />
        <h1 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h1>
      </div>

      {/* 버튼 그룹 */}
      <div className="w-64 space-y-4 text-center">
        <Link
          href="/mypage/edit"
          className="w-full py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 inline-block"
        >
          프로필 사진 변경
        </Link>
        <button className="w-full py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">수강 캘린더</button>
        <Link
          href="/mentors/new"
          className="w-full py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 inline-block"
        >
          멘토신청
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
