'use client';

import React from 'react';
import { signInWithGithub } from '@/utils/supabase/auth';

const GitHubLoginButton: React.FC = () => {
  const handleGitHubLogin = async () => {
    try {
      await signInWithGithub();
    } catch (error: any) {
      alert(`GitHub 로그인에 실패했습니다.`);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleGitHubLogin}
        className="flex items-center justify-center bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path
            fillRule="evenodd"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.01c-3.338.724-4.033-1.416-4.033-1.416-.546-1.384-1.333-1.75-1.333-1.75-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.931 0-1.31.469-2.38 1.236-3.22-.124-.302-.536-1.521.116-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 0 1 6 0c2.292-1.552 3.3-1.23 3.3-1.23.653 1.655.241 2.874.118 3.176.768.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.473 5.921.43.369.814 1.096.814 2.21v3.285c0 .32.22.694.83.577C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12z"
            clipRule="evenodd"
          />
        </svg>
        GitHub으로 로그인
      </button>
    </div>
  );
};

export default GitHubLoginButton;
