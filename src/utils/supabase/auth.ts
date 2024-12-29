import { createClient } from './client';
// import { saveUserToDatabase } from './db';

export async function signInWithGithub() {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `https://mentory-seven.vercel.app/api/auth/callback`,
    },
  });

  if (error) {
    throw new Error(`GitHub 로그인 실패.`);
  }
}
