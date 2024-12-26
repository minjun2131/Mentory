import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

interface AuthState {
  isLoggedIn: boolean;
  profileImage: string | null;
  userId: string | null;
  setAuthState: (authData: { isLoggedIn: boolean; profileImage: string | null; userId: string | null }) => void;
  clearAuthState: () => void;
  fetchUserProfile: () => Promise<void>;
  //   login: (email: string, password: string) => Promise<void>;
  //   signup: (email: string, password: string, name: string) => Promise<void>;
  //   logout: () => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  profileImage: null,
  userId: null,
  setAuthState: (authData) => set(authData),
  clearAuthState: () => set({ isLoggedIn: false, profileImage: null, userId: null }),
  //   login: async (email, password) => {
  //     const data = await logIn(email, password);
  //     set({ isLoggedIn: true, profileImage: data.user?.user_metadata?.avatar_url || null });
  //   },
  //   signup: async (email, password, name) => {
  //     await signUp(email, password, name);
  //     set({ isLoggedIn: false });
  //   },
  //   logout: async () => {
  //     await logOut();
  //     set({ isLoggedIn: false, profileImage: null });
  //   }


fetchUserProfile: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.error('사용자 정보를 가져오지 못했습니다:', error);
        throw new Error('사용자 정보를 가져오지 못했습니다.');
      }

      const userId = data.user.id;

      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('profile_image')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('프로필 이미지를 가져오는 데 실패했습니다:', profileError);
        throw new Error('프로필 이미지를 가져오는 데 실패했습니다.');
      }

      set({
        isLoggedIn: true,
        profileImage: profileData?.profile_image || null,
        userId,
      });
    } catch (error) {
      console.error('fetchUserProfile 에러:', error);
    }
  },
}));
