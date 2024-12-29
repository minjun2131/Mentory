import { createClient } from '@/utils/supabase/client';
import { getAuthenticatedUser } from './profile';

interface UploadProfileImageParams {
  type: 'mentor-profile' | 'profile';
  file: File;
}

export const uploadProfileImage = async ({ type, file }: UploadProfileImageParams): Promise<string> => {
  const supabase = createClient();
  const user = await getAuthenticatedUser();

  const folderPath = `profile-images/${user.id}`;
  const fileName = `${type}-${Date.now()}.jpg`;
  const filePath = `${folderPath}/${fileName}`;
  const { error: uploadError } = await supabase.storage.from('profile').upload(filePath, file, {
    contentType: file.type,
    upsert: true
  });
  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }
  const { data: publicUrlData } = supabase.storage.from('profile').getPublicUrl(filePath);
  return publicUrlData.publicUrl;
};
