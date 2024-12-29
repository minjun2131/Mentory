'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UserProfile {
  isLoggedIn: boolean;
  profileImage: string | null;
}

const fetchUserProfile = async (): Promise<UserProfile> => {
  const supabase = createClient();
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return { isLoggedIn: false, profileImage: null };

    const { data: profileData, error } = await supabase
      .from('users')
      .select('profile_image')
      .eq('id', user.id)
      .single();

    if (error) {
      console.log(error);
      return { isLoggedIn: true, profileImage: null };
    }

    return { isLoggedIn: true, profileImage: profileData?.profile_image || null };
  } catch (error) {
    console.error('오류가 발생했습니다.');
    return { isLoggedIn: false, profileImage: null };
  }
};

const Header = () => {
  const { open } = useModalStore();
  const queryClient = useQueryClient()
  const supabase = createClient()

useEffect(() => {
  const {data:{subscription}} = supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({queryKey: ['userProfile']})
  })

  return () => {
    subscription.unsubscribe()
  }
},[queryClient,supabase])

  const { data, isPending, isError } = useQuery<UserProfile, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile
  });

  const handleLogin = () => {
    open('login')
  queryClient.invalidateQueries({queryKey: ['userProfile']})
  }

  const handleSignup = () => {
    open('signup')

    queryClient.invalidateQueries({queryKey: ['userProfile']})
  }

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>shwoing an error</div>;

  const { isLoggedIn, profileImage } = data || { isLoggedIn: false, profileImage: null };

  return (
    <header className="sticky top-0 z-50 items-center bg-white shadow py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Mentory_Logo" width={150} height={40} className="mr-4 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Link href="/mypage">
              <Image
                src={profileImage || '/images/profile.png'}
                width={40}
                height={40}
                alt="profile_image"
                className="w-10 h-10 rounded-full"
              />
            </Link>
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
      </div>
    </header>
  );
};

export default Header;
