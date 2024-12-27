'use client';

import Image from 'next/image';
import { useState } from 'react';

export const HeroSection: React.FC = () => {
  const [searchHashtag, setSearchHashtag] = useState('');

  return (
    <section className="relative py-12">
      <div className="w-full">
        <Image
          src="/images/hero-image.png"
          alt="Hero-Image"
          width={1920}
          height={300}
          className="w-full h-[30vh] sm:h-[300px] object-cover filter brightness-90 blur-[1px] grayscale"
        />
        <div className="absolute inset-0 flex justify-center items-center" style={{ top: '40%' }}>
          <div className="w-[90%] max-w-xl bg-white/70 backdrop-blur-md rounded-full shadow-lg flex items-center p-3">
            <input
              type="text"
              placeholder="Search for mentors, topics, or more..."
              className="flex-1 bg-transparent outline-none text-gray-700 px-4 text-lg"
            />
            <button
              className="px-6 py-2 bg-main text-white rounded-full hover:bg-main-hover transition-all"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
