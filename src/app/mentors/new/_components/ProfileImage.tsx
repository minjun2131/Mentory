import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import StepTitle from './StepTitle';
import ErrorMessage from '@/components/ErrorMessage';

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
    <div className="flex flex-col items-center space-y-4 h-[425px]">
      <StepTitle>멘토님의 프로필 사진을 등록해주세요</StepTitle>
      <div className="flex flex-col justify-center items-center h-[280px]">
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-10">
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
        <label
          htmlFor="file-input"
          className="px-4 py-2 text-blue-500 bg-gray-100 border rounded-lg hover:bg-gray-200 cursor-pointer mb-5"
        >
          이미지 등록하기
        </label>
        <ErrorMessage>{errors.profileImageFile?.message as string}</ErrorMessage>
      </div>
    </div>
  );
};

export default ProfileImage;
