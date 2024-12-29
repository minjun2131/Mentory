"use client"

import { useModalStore } from '@/store/modalStore';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CommunitySection: React.FC = () => {
  const router = useRouter();
  const { open } = useModalStore();

  const handleJoinClick = async () => {
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      router.push('/mentor-list');
    } else {
      open('signup');
    }
  };

  return (
    <section className="py-12 bg-[#F6F6F6] px-10 lg:px-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="text-left flex-1">
          <h3 className="text-3xl font-extrabold mb-6">Enjoy our community</h3>
          <p className="text-xl mb-8 font-medium">Let&apos;s be together and grow together</p>
          <button
            onClick={handleJoinClick}
            className="w-[200px] py-4 bg-[#D9D9D9] text-black rounded-full text-xl font-bold hover:bg-gray-400 shadow-md transition-colors"
          >
            Join
          </button>
        </div>
        <div className="flex-shrink-0 ml-8">
          <Image
            src="/images/logo.png"
            alt="Mentory_Logo"
            width={500}
            height={80}
            className="w-[200px] sm:w-[300px] lg:w-[500px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};
