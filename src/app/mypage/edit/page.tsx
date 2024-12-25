'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfileModal() {
  const router = useRouter();

  const closeHandler = () => {
    router.back(); // 뒤로 가기(모달 닫기)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-wite rounded-lg shadow-lg">
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
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img src="https://via.placeholder.com/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="px-4 py-2 text-blue-500 bg-gray-100 border rounded-lg hover:bg-gray-200">
              Change Profile Picture
            </button>
          </div>

          {/* 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* 모달 하단 */}
        <div className="flex items-center justify-end px-6 py-4 border-t">
          <div className="space-x-3">
            <button onClick={closeHandler} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
