// src/chat/ChatSheet.tsx
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ReactNode } from "react";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

type ChatSheetProps = {
  children: ReactNode;
};

export const ChatSheet = ({ children }: ChatSheetProps) => (
  <Sheet>
    {children}

    <SheetContent
      side="bottom"
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="h-[100dvh] px-0 pb-safe bg-white flex flex-col" // pb-safe = iOS 홈바
    >
      <header className="h-10 flex justify-center items-center font-bold">
        채팅
      </header>

      <ChatMessageList className="flex-1 overflow-y-auto px-4" />

      <ChatInput />
    </SheetContent>
  </Sheet>
);
