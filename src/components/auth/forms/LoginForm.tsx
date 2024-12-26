'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { open, close } = useModalStore();

  const handleLogin = async () => {
    // console.log('로그인이 되는가!!!!');
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      close();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Mentory_Logo" width={300} height={70} className="mx-auto" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="아이디"
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
        <button
          onClick={handleLogin}
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
      </div>
    </div>
  );
};

export default LoginForm;
