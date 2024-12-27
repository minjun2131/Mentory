import { Database } from '@/types/supabase';
import { getAuthenticatedUser } from './profile';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

type Mentor = Database['public']['Tables']['mentors']['Row'];

export const getMentorProfile = async (): Promise<Mentor[] | null> => {
  try {
    const user = await getAuthenticatedUser();
    const { data: mentors, error: userProfileError } = await supabase
      .from('mentors')
      .select('*')
      .eq('user_id', user.id);
    // 가져오고 싶은데이터가 여러개인데 single() 을 사용해서 생긴 오류

    if (userProfileError) {
      throw new Error(`프로필 정보를 가져오는 데 실패하였습니다. ${userProfileError.message}`);
    }
    return mentors ? (mentors as Mentor[]) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
