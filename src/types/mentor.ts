import { Database } from './supabase';

export interface MentorInsertData {
  careers: Database['public']['Tables']['careers']['Insert'][];
  hashTags?: string[];
  introduction?: string;
  profileImg?: string;
}
