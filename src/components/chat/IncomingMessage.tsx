import { Database } from '@/types/supabase';
import Image from 'next/image';

type User = Database['public']['Tables']['users']['Row'];

interface IncomingMessageProps {
  message: { content: string; sender_id: string };
  otherUser: User | null;
}

const IncomingMessage: React.FC<IncomingMessageProps> = ({ message, otherUser }) => {
  return (
    <div>
      <div className="flex">
        <div className="mr-3">
          {otherUser?.profile_image && (
              <Image
                src={otherUser.profile_image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover max-w-[40px] min-w-[40px]"
              />
          )}
        </div>
        <div className="w-full">
          <p>{otherUser?.name || '알 수 없는 사용자'}</p>
          <div className={`p-2 mb-3 rounded-lg w-auto break-all bg-blue-100 text-black`}>{message.content}</div>
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;
