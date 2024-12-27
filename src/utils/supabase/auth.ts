import { createClient } from './client';
import { saveUserToDatabase } from './db';

export async function signInWithGithub() {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(`GitHub 로그인 실패.`);
  }
}

export async function handleAuthCallback() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`세션 가져오기 실패.`);
  }

  const session = data?.session;

  if (session && session.user) {
    const supabaseUser = {
      id: session.user.id,
      email: session.user.email ?? null,
      user_metadata: {
        name: session.user.user_metadata.name || '익명 사용자',
      },
      profile_image: session.user.user_metadata.avatar_url || null, // GitHub 프로필 이미지
    };

    await saveUserToDatabase(supabaseUser); // 사용자 정보 저장
  }

  return session;
}
