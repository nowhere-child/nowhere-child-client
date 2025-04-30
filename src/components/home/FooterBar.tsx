import { Button } from "@/components/ui/button";
export const FooterBar = ({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: () => void;
}) => (
  <div className="bg-black flex items-center justify-center py-4">
    <Button
      onClick={onSubmit}
      disabled={disabled}
      className={`w-full max-w-xs h-12 text-lg rounded-[12px] bg-[#F2F2F2] text-[#191919] disabled:bg-[#313131] disabled:text-[#565656]`}
    >
      입장하기
    </Button>
  </div>
);
