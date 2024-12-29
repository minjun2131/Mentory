'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserProfile } from '@/app/mypage/_hooks/useUserProfile';

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

    const { data: profileData } = await supabase.from('users').select('profile_image').eq('id', user.id).single();

    return { isLoggedIn: true, profileImage: profileData?.profile_image || null };
  } catch (error) {
    console.error('오류가 발생했습니다.', error);
    return { isLoggedIn: false, profileImage: null };
  }
};

const Header = () => {
  const { open } = useModalStore();
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, supabase]);

  const { data, isPending, isError } = useQuery<UserProfile, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile
  });

  const { data: profileImage, isPending: isProfilePending } = useUserProfile();

  const handleLogin = () => {
    open('login');
  };

  const handleSignup = () => {
    open('signup');
  };

  const userImage = Array.isArray(profileImage) && profileImage.length > 0 ? profileImage[0] : null;
  if (isError) return <div>shwoing an error</div>;

  const { isLoggedIn } = data || { isLoggedIn: false };

  return (
    <header className="sticky top-0 z-50 items-center bg-white shadow py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Mentory_Logo" width={150} height={40} className="mr-4 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isPending || isProfilePending ? (
            <span className="text-gray-500">정보를 가져오는 중입니다...</span>
          ) : isLoggedIn ? (
            <Link href="/mypage">
              <Image
                src={userImage?.profile_image || '/images/profile.png'}
                width={40}
                height={40}
                alt="profile_image"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Log In
              </button>

              <button
                onClick={handleSignup}
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
