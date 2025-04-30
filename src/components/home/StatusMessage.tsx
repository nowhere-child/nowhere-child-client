import { CircleCheck } from "lucide-react";
export const StatusMessage = ({ done }: { done: boolean }) => (
  <div className="h-6 mb-[14px] flex w-full justify-center text-white">
    {done ? (
      <div className="flex items-center gap-1">
        입장코드 확인 완료 <CircleCheck size={20} className="text-blue-500" />
      </div>
    ) : (
      <span className="text-gray-200">입장코드를 입력해주세요.</span>
    )}
  </div>
);
