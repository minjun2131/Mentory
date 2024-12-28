'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { useModalStore } from '@/store/modalStore';

interface SignupInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignupInput>();
  const { open } = useModalStore();

  const onSubmit = async (data: SignupInput) => {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            user_name: data.name,
            avatar_url: ''
          }
        }
      });
      if (error) throw new Error(error.message);
      alert('회원가입에 성공했습니다.');
      open('login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('에러가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 max-h-full flex flex-col justify-between">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Mentory_Logo" width={300} height={70} className="mx-auto" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
      <input
        {...register('email', { required: '이메일을 입력해주세요.' })}
        type="email"
        placeholder="이메일"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' }
        })}
        type="password"
        placeholder="비밀번호"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

      <input
        {...register('confirmPassword', {
          validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.'
        })}
        type="password"
        placeholder="비밀번호 확인"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>}

      <input
        {...register('name', { required: '이름을 입력해주세요.' })}
        type="text"
        placeholder="이름"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

      <button className="bg-main hover:bg-main-hover text-white py-2 px-8 min-w-[200px] rounded mx-auto block transition-all">
        회원가입
      </button>
      <span className="block text-center mt-4">
        이미 가입하셨나요?
        <button onClick={() => open('login')} className="text-main hover:underline">
          로그인
        </button>
      </span>
    </form>
  );
};

export default SignupForm;
