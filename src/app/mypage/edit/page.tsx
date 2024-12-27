'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateProfileImage } from '../_hooks/useUpdateProfileImage';
import { useUserProfile } from '../_hooks/useUserProfile';

const EditProfileModal = () => {
  const router = useRouter();
  const profileUpdate = useUpdateProfileImage();

  // 로컬 스토리지나 쿠키, 혹은 다른 방법으로 isLoggedIn 상태를 가져오는 방식
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로그인 상태 확인 (로컬 스토리지나 쿠키에서 가져오기)
  useEffect(() => {
    const login = async () => {
      try {
        // 더미 계정으로 로그인 시도
        setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
      } catch (error) {
        console.log('로그인 실패: ' + (error as Error).message);
      }
    };

    // 페이지가 렌더링될 때 로그인 시도
    login();
  }, []);

  const { data, isPending, isError } = useUserProfile();
  const profileData = Array.isArray(data) && data.length > 0 ? data[0] : null;

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  // 기존 프로필 데이터 세팅
  useEffect(() => {
    if (profileData) {
      setName(profileData.name || '');
      setPreview(profileData.profile_image || 'https://via.placeholder.com/200');
    }
  }, [profileData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // 미리보기 이미지 업데이트
    }
  };

  const handleSave = () => {
    profileUpdate.mutate(
      { file, name },
      {
        onSuccess: () => {
          router.back(); // 성공 시 모달 닫기
        },
        onError: (error) => {
          console.error('업데이트 실패:', error);
        }
      }
    );
  };

  const closeHandler = () => {
    router.back();
  };

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError || !profileData) {
    return <div>프로필 데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-500">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={closeHandler} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="px-6 py-6 space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-input" />
            <label
              htmlFor="file-input"
              className="px-4 py-2 text-blue-500 bg-gray-100 border rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              이미지 변경하기
            </label>
          </div>

          {/* 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 모달 하단 */}
        <div className="flex items-center justify-end px-6 py-4 border-t">
          <div className="space-x-3">
            <button onClick={closeHandler} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={profileUpdate.isPending}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {profileUpdate.isPending ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
