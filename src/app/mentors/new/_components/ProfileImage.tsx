import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import MoveActions from './MoveActions';

interface ProfileImageProps {
  onNext: () => void;
  onPrev: () => void;
  formReturn: UseFormReturn;
}

const ProfileImage = ({ onNext, onPrev, formReturn }: ProfileImageProps) => {
  const { register, watch } = formReturn;
  const name = 'profileImageFile';
  const profileImageFile = watch(name);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-12 self-start">멘토님의 프로필 사진을 등록해주세요.</h2>
      <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {profileImageFile && (
          <Image
            src={URL.createObjectURL(profileImageFile[0])}
            width={96}
            height={96}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <input type="file" accept="image/*" className="hidden" id="file-input" {...register(name)} />
      <label
        htmlFor="file-input"
        className="px-4 py-2 text-blue-500 bg-gray-100 border rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        이미지 변경하기
      </label>
      <MoveActions onNext={onNext} onPrev={onPrev} name={name} />
    </div>
  );
};

export default ProfileImage;
