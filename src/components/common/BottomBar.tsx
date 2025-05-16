// src/components/common/BottomBar.tsx
import { ChatSheet } from "@/chat/ChatSheet";
import { Lightbulb, MapPin, MessageCircle } from "lucide-react";
import { SheetTrigger } from "../ui/sheet";
import HintDialog from "./HintDialog";
import MapDialog from "./MapDialog";

export default function StickyBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center z-10">
      <div className="flex gap-4 bg-white text-black rounded-full px-2 py-1 shadow-xl items-center">
        <MapDialog>
          <button type="button" className="bg-zinc-300 rounded-4xl p-1">
            <MapPin className="w-6 h-6" />
          </button>
        </MapDialog>
        <ChatSheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <MessageCircle className="w-5 h-5" />
            </button>
          </SheetTrigger>
        </ChatSheet>

        <HintDialog>
          <button type="button" className="bg-zinc-300 rounded-4xl p-1">
            <Lightbulb className="w-6 h-6" />
          </button>
        </HintDialog>
      </div>
    </div>
  );
}
