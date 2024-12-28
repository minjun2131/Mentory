'use server';

import { MentorInsertData } from '@/types/mentor';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { snakeCase } from 'change-case/keys';

type Mentor = Database['public']['Tables']['mentors']['Row'];

interface AddParams extends Partial<MentorInsertData> {
  supabase: SupabaseClient;
}

export const registerMentor = async ({ introduction, profileImg, hashTags, careers }: MentorInsertData) => {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const mentor = await addMentor({ introduction, profileImg, authData, supabase });
  await addCareers({ careers, supabase, mentor });
  await addHashTags({ hashTags, supabase, mentor });
};

interface AddMentorParams extends AddParams {
  authData: { user: User | null };
}

const addMentor = async ({ introduction, profileImg, authData, supabase }: AddMentorParams): Promise<Mentor> => {
  console.log('🚀 ~ registerMentor ~ profileImg:', profileImg);
  const { data: mentor, error } = await supabase
    .from('mentors')
    .insert({ introduction, user_id: authData.user?.id })
    .select()
    .single();
  if (error) throw error;
  return mentor;
};

interface AddCareersParams extends AddParams {
  mentor: Mentor;
}

const addCareers = async ({ careers, supabase, mentor }: AddCareersParams) => {
  if (!careers) return;
  const { error } = await supabase
    .from('careers')
    .insert(careers.map((career) => snakeCase({ ...career, mentor_id: mentor.id })));
  if (error) throw error;
};

interface AddCareersParams extends AddParams {
  mentor: Mentor;
}

const addHashTags = async ({ hashTags, supabase, mentor }: AddCareersParams) => {
  if (!hashTags) return;
  const { error } = await supabase
    .from('hashtags')
    .insert(hashTags.map((hashTag) => ({ tag_name: hashTag, mentor_id: mentor.id })));
  if (error) throw error;
};
