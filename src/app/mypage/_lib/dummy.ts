import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const loginAsDummyUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "user3@example.com", // 더미 계정 이메일
    password: "123123", // 더미 계정 비밀번호
  });

  if (error) {
    console.error("더미 계정 로그인 실패:", error.message);
    throw new Error("더미 계정 로그인에 실패했습니다.");
  }

  console.log("더미 계정으로 로그인 성공:", data);
  return data;
};
