'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { open } = useModalStore();

  useEffect(() => {
    if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError(null);
    }
    setPasswordMatch(password === confirmPassword && confirmPassword !== '');
  }, [password, confirmPassword]);

  const handleSignup = async () => {
    // console.log('회원가입이 되는가!!!!');
    if (password !== confirmPassword) {
      return; //이러면 이제 에러있으면 진행이 안되겠지....?아마....?
    }

    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      const userId = data.user?.id;

      if (userId) {
        const { error: userError } = await supabase.from('users').insert([{ id: userId, name }]);
        if (userError) throw new Error(userError.message);
      }
      alert('회원가입에 성공했습니다.');
      open('login');
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
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
        {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        {passwordMatch === false && <p className="text-red-500 text-sm mb-4">비밀번호가 일치하지 않습니다.</p>}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded mb-4 bg-gray-200 placeholder-black"
        />
        <button
          onClick={handleSignup}
          className={`${
            passwordError || !passwordMatch || !name.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-main hover:bg-main-hover'
          } text-white py-2 px-8 min-w-[200px] rounded mx-auto block transition-all`}
          disabled={!!passwordError || !passwordMatch || !name.trim()}
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
