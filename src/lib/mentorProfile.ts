import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

type Mentor = Database['public']['Tables']['mentors']['Row'];
type Career = Database['public']['Tables']['careers']['Row'];

export const getMentorProfile = async (): Promise<Mentor | null> => {
  try {
    const { data: mentors, error: mentorProfileError } = await supabase
      .from('mentors')
      .select('*')
      .select('user_id, introduction, profile_image')
      .returns<Mentor>();
    // 가져오고 싶은데이터가 여러개인데 single() 을 사용해서 생긴 오류
    if (!mentors) {
      throw new Error('멘토 데이터가 존재하지 않습니다.');
    }

    if (mentorProfileError) {
      throw new Error(`프로필 정보를 가져오는 데 실패하였습니다. ${mentorProfileError}`);
    }
    return mentors;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMentorDetail = async (mentorId: string) => {
  try {
    const { data: mentorDetail, error: mentorProfileError } = await supabase
      .from('mentors')
      .select('*')
      .eq('user_id', mentorId)
      .single();
    if (!mentorDetail) {
      throw new Error('멘토 데이터가 존재하지 않습니다.');
    }

    if (mentorProfileError) {
      throw new Error(`프로필 정보를 가져오는 데 실패하였습니다. ${mentorProfileError}`);
    }
    return mentorDetail;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMentorCareers = async (mentorId: string): Promise<Career | null> => {
  try {
    const mentorDetail = await getMentorDetail(mentorId);
    if (!mentorDetail) {
      console.error('멘토 데이터가 존재하지 않습니다.');
      return null;
    }

    const { data: careers, error } = await supabase
      .from('careers')
      .select('*')
      .eq('mentor_id', mentorDetail.id)
      .returns<Career>();

    if (error) {
      throw new Error(`경력 데이터를 가져오는 데 실패했습니다. ${error.message}`);
    }

    return careers;
  } catch (error) {
    console.error('경력 데이터를 가져오는 도중 오류가 발생했습니다:', error);
    return null;
  }
};
