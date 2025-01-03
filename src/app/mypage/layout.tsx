'use client';

import React from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center justify-center min-h-screen">{children}</div>;
}
