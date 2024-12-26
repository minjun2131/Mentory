import { createClient } from './client';
import { authStore } from '@/store/authStore';

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  const userId = data.user?.id;
  if (userId) {
    const { error: userError } = await supabase.from('users').insert([{ id: userId, name }]);

    if (userError) throw new Error(userError.message);
  }

  return data;
}

export async function logIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  try {
    await authStore.getState().fetchUserProfile();
  } catch (fetchError) {
    console.error('로그인 후 프로필 가져오기 실패:', fetchError);
  }

  return data;
}

export async function logOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  //초기화
  authStore.getState().clearAuthState();

}
