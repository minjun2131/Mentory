'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModalStore } from '@/store/modalStore';
import { authStore } from '@/store/authStore';

const Header = () => {
  const { isLoggedIn, profileImage } = authStore();
  const { open } = useModalStore();

  return (
    <header className="sticky top-0 flex justify-between items-center bg-white p-4 shadow">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/images/logo.png" alt="Mentory_Logo" width={150} height={40} className="mr-4 cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Image
            src={profileImage || '/images/profile.png'}
            width={40}
            height={40}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <>
            <button
              onClick={() => open('login')}
              className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
            >
              Log In
            </button>

            <button
              onClick={() => open('signup')}
              className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
