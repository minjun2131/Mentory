
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

// 인증된 유저 정보 가져오기 => 반복이 너무 많아서 함수로 표현
export const getAuthenticatedUser = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error(`유저 인증 실패: ${error?.message}`);
  }
  return user;
};

export const getUserProfile = async () => {
  try {
    const user = await getAuthenticatedUser();
    const { data: userProfile, error: userProfileError } = await supabase.from('users').select('*').eq('id', user.id);
    // 가져오고 싶은데이터가 여러개인데 single() 을 사용해서 생긴 오류

    if (userProfileError) {
      throw new Error(`프로필 정보를 가져오는 데 실패하였습니다. ${userProfileError.message}`);
    }
    return userProfile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserDetail = async (userId: string) => {
  try {
    const { data: userDetail, error: userDetailError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (!userDetail) {
      throw new Error('멘토 데이터가 존재하지 않습니다.');
    }

    if (userDetailError) {
      throw new Error(`프로필 정보를 가져오는 데 실패하였습니다. ${userDetailError}`);
    }
    return userDetail;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserProfileImage = async ({
  file,
  name
}: {
  file: File | null;
  name: string;
}): Promise<string | undefined> => {
  try {
    const user = await getAuthenticatedUser();

    // 버킷 폴더 생성 및 이미지 URL 생성
    const userId = user.id;

    let publicUrl: string | undefined = undefined;
    console.log(file);
    if (file) {
      const folderPath = `profile-images/${userId}`;
      const fileName = `profile-${Date.now()}.jpg`;
      const filePath = `${folderPath}/${fileName}`;

      console.log(file.type);

      const { error: uploadError } = await supabase.storage.from('profile').upload(filePath, file, {
        contentType: file.type,
        upsert: true
      });

      if (uploadError) {
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage.from('profile').getPublicUrl(filePath);
      publicUrl = publicUrlData.publicUrl;
    }
    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_image: publicUrl, name })
      .eq('id', userId);

    if (updateError) {
      throw new Error(`프로필 이미지를 업데이트 하는 데 실패하였습니다. ${updateError.message}`);
    }

    return publicUrl;
  } catch (error) {
    console.log(error);
  }
};
