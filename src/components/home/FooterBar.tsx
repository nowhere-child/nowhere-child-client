import { Button } from "@/components/ui/button";
export const FooterBar = ({
  disabled,
  onSubmit,
  bg = "#000000",
  message,
}: {
  disabled: boolean;
  onSubmit: () => void;
  bg?: string;
  message: string;
}) => (
  <div className={`bg-[${bg}] flex items-center justify-center py-4`}>
    <Button
      onClick={onSubmit}
      disabled={disabled}
      className={`w-full max-w-xs h-12 text-lg rounded-[12px] bg-[#3182F6] text-[#FCFCFC] disabled:bg-[#313131] disabled:text-[#565656]`}
    >
      {message}
    </Button>
  </div>
);
