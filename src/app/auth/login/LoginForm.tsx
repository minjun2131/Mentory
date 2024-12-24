'use client';

import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('로그인이 되는가!!!!');
  };

  return (
    <div>
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <button onClick={handleLogin} className="bg-main text-white px-4 py-2 rounded w-full hover:bg-main-hover">
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
