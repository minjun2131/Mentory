'use client';
import React from 'react';
import Image from 'next/image';

export default function Avatar({ src, size }: { src: string | null; size: number }) {
  return (
    <div>
      {src ? (
        <Image src={src} alt="Avatar" width={size} height={size} />
      ) : (
        <div style={{ width: size, height: size, backgroundColor: '#ccc' }}>이미지가 존재하지 않습니다.</div>
      )}
    </div>
  );
}
