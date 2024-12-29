import ChatModal from '@/components/chat/ChatModal';
import { CommunitySection } from '@/components/home/CommunitySection';
import { HeroSection } from '@/components/home/HeroSection';
import { MentorSection } from '@/components/home/MentorSection';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection />
        <MentorSection />
        <CommunitySection />
        <ChatModal />
      </div>
    </>
  );
 }
