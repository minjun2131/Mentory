import { createClient } from './client';

export async function signInWithGithub() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`
    }
  });

  if (error) throw new Error(`GitHub 연결에 실패했습니다.`);

  return data;
}
