import { ChatProvider } from "@/chat/ChatProvider";
import MissionEngine from "@/components/mission/MissionEngine";

const MissionPage = () => {
  return (
    <ChatProvider>
      <div className=" h-screen overflow-hidden overscroll-none bg-[#1A1A1A] text-white">
        <MissionEngine />
      </div>
    </ChatProvider>
  );
};

export default MissionPage;
