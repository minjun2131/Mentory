import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ProfileImageProps {
  formReturn: UseFormReturn;
}

const ProfileImage = ({ formReturn }: ProfileImageProps) => {
  const {
    register,
    watch,
    formState: { errors }
  } = formReturn;
  const name = 'profileImageFile';
  const profileImageFile = watch(name);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-12 self-start">멘토님의 프로필 사진을 등록해주세요.</h2>
      <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {profileImageFile && profileImageFile[0] && (
          <Image
            src={URL.createObjectURL(profileImageFile[0])}
            width={96}
            height={96}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="file-input"
        {...register(name, {
          validate: () => (profileImageFile && profileImageFile[0]) || '필수 입력 값입니다.'
        })}
      />
      {errors.profileImageFile && (
        <p className="text-red-500 text-sm mb-2">{errors.profileImageFile.message as string}</p>
      )}
      <label
        htmlFor="file-input"
        className="px-4 py-2 text-blue-500 bg-gray-100 border rounded-lg hover:bg-gray-200 cursor-pointer"
      >
        이미지 등록하기
      </label>
    </div>
  );
};

export default ProfileImage;
