// src/components/mission/MapDialog.tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UosMap from "../../assets/crop_uos_map.png";
interface Props {
  /** 버튼(아이콘)을 그대로 children 으로 넘기면 됩니다. */
  children: React.ReactNode;
}

export default function MapDialog({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[340px] bg-white border-none p-0 justify-center">
        <img src={UosMap} className="max-h-[400px]"></img>
      </DialogContent>
    </Dialog>
  );
}
