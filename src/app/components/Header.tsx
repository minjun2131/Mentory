'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const user = {
      loggedIn: true,
      profileImage: ''
    };
    setIsLoggedIn(user.loggedIn);
    setProfileImage(user.profileImage);
  }, []);

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
            <Link
              href="/login"
              className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
