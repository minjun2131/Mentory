import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileImage } from "../_lib/profile";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  const profileUpdate = useMutation<string | undefined, Error, File>({
    mutationFn: updateUserProfileImage, // 기존 updateUserProfileImage 함수 사용
    onSuccess: (publicUrl) => {
      console.log("프로필 이미지 업데이트 성공:", publicUrl);
      // 프로필 데이터 캐시 무효화 (다시 로드)
      // 그냥 ['profile 사용시 에러 발생']
      // queryKey 명시하니 타입에러 해결
      queryClient.invalidateQueries({queryKey:['profile']});
    },
    onError: (error: Error) => {
      console.error("프로필 이미지 업데이트 실패:", error.message);
    },
  });

  return profileUpdate;
};
