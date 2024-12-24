import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// 인증된 유저 정보 가져오기 => 반복이 너무 많아서 함수로 표현
const getAuthenticatedUser = async () => {
    const {data: {user}, error} = await supabase.auth.getUser();
    if (error || !user) {
        throw new Error(`유저 인증 실패: ${error!.message}`)
    }
    return user;
} 

export const getUserProfile = async () => {
    try {
        const user = await getAuthenticatedUser();
        const {data:userProfile,error:userProfileError} = await supabase
        .from('users')
        .select("*")
        .eq("id",user.id)
        .single();
    
        if (userProfileError) {
            throw new Error (
                `프로필 정보를 가져오는 데 실패하였습니다. ${userProfileError.message}`
            );      
        }   
        return userProfile;
    }

    catch (error) {
        console.log(error);
    } 
};


export const updateUserProfileImage = async (file: File) => {
    try {
        const user = await getAuthenticatedUser();

        // 버킷 폴더 생성 및 이미지 URL 생성
        const userId = user.id;
        const folderPath = `profile-images/${userId}`;
        const fileName = `profile-${Date.now()}.jpg`;
        const filePath = `${folderPath}/${fileName}`;

        const {error:uploadError} = await supabase.storage
        .from('profile')
        .upload(filePath,file,{
            contentType:file.type,
            upsert:true,
        });

        if (uploadError) {
            throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
        }

        const {data: publicUrlData} = supabase.storage.from('profile').getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        const {error:updateError} = await supabase.from('users')
        .update({profile_image:publicUrl})
        .eq('id',userId);

        if (updateError) {
            throw new Error(
                `프로필 이미지를 업데이트 하는 데 실패하였습니다. ${updateError.message}`
            )
        }

        return publicUrl;
    }catch(error){
        console.log(error);
    }

    
}



