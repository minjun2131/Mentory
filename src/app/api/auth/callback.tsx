'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleAuthCallback } from '@/utils/supabase/auth';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await handleAuthCallback();
        router.push('/'); // 인증 성공 후 홈으로 이동
      } catch (error) {
        console.error('인증 처리 실패:', error);
        router.push('/login'); // 실패 시 로그인 페이지로 이동
      }
    };

    processAuth();
  }, [router]);

  return <div>인증 처리 중...</div>;
};

export default AuthCallback;
