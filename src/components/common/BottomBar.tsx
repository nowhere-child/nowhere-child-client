// src/components/common/BottomBar.tsx
import { Lightbulb, MapPin, MessageCircle } from "lucide-react";
import HintDialog from "./HintDialog";

export default function StickyBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center z-10">
      <div className="flex gap-4 bg-white text-black rounded-full px-2 py-1 shadow-xl items-center">
        <button type="button" className="bg-zinc-300 rounded-4xl p-1">
          <MapPin className="w-6 h-6" />
        </button>
        <button type="button" className="bg-zinc-300 rounded-4xl p-1">
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* 힌트 아이콘 → Dialog 트리거 */}
        <HintDialog>
          <button type="button" className="bg-zinc-300 rounded-4xl p-1">
            <Lightbulb className="w-6 h-6" />
          </button>
        </HintDialog>
      </div>
    </div>
  );
}
