import { MapPin, MessageCircle, Text } from "lucide-react";

const StickyBottomBar = () => {
  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-10">
      <div className="flex gap-2 bg-white text-black rounded-full px-4 py-2 shadow-xl">
        <MapPin className="w-5 h-5" />
        <MessageCircle className="w-5 h-5" />
        <Text className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StickyBottomBar;
