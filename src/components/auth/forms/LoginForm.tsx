'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { useModalStore } from '@/store/modalStore';

interface LoginInput {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>();
  const { open, close } = useModalStore();

  const onSubmit = async (data: LoginInput) => {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw new Error(error.message);
      close();
    } catch (error) {
      if (error instanceof Error) {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Mentory_Logo" width={300} height={70} className="mx-auto" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
      <input
        {...register('email', { required: '이메일을 입력해주세요.' })}
        type="email"
        placeholder="아이디"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

      <input
        {...register('password', { required: '비밀번호를 입력해주세요.' })}
        type="password"
        placeholder="비밀번호"
        className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
      />
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

      <button
        type="submit"
        className="bg-main text-white py-2 px-8 min-w-[200px] rounded mx-auto block hover:bg-main-hover transition-all"
      >
        로그인
      </button>
      <span className="block text-center mt-4">
        계정이 없으신가요?
        <button onClick={() => open('signup')} className="text-main hover:underline">
          회원가입
        </button>
      </span>
    </form>
  );
};

export default LoginForm;
