import Image from 'next/image';

export default function ProfileImage({ user }: { user: { profile_image?: string } | null }) {
  return (
    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
      {user?.profile_image ? (
        <Image
          src={user.profile_image}
          alt="Profile_Image"
          width={96} 
          height={96}
          className="object-cover"
        />
      ) : (
        <span className="text-4xl text-gray-500">👤</span>
      )}
    </div>
  );
}
