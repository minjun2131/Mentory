import { createClient } from './client';

type SupabaseUser = {
  id: string;
  email: string | null;
  user_metadata: {
    name: string;
  };
  profile_image: string | null; // 프로필 이미지 (옵션)
};

export async function saveUserToDatabase(user: SupabaseUser) {
  const supabase = createClient();

  const { error } = await supabase.from('users').upsert({
    id: user.id,
    email: user.email,
    name: user.user_metadata.name,
    profile_image: user.profile_image,
  });

  if (error) {
    throw new Error(`사용자 정보를 저장하는 데 실패했습니다.`);
  }
}
