'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useModalStore } from '@/app/store/modalStore';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { open } = useModalStore();

  const handleSignup = () => {
    console.log('회원가입이 되는가!!!!');
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Mentory_Logo" width={300} height={70} className="mx-auto" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        <input
          type="name"
          placeholder="이름"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        <button
          onClick={handleSignup}
          className="bg-main text-white py-2 px-8 min-w-[200px] rounded mx-auto block hover:bg-main-hover transition-all"
        >
          회원가입
        </button>
        <span className="block text-center mt-4">
          이미 가입하셨나요?
          <button onClick={() => open('login')} className="text-main hover:underline">
            로그인
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
