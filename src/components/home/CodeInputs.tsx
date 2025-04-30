import { Input } from "@/components/ui/input";
import { ChangeEvent, MutableRefObject } from "react";

type Props = {
  codes: string[];
  refs: MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (v: string, i: number) => void;
  onKey: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
  setFocus: (v: boolean) => void;
};

export const CodeInputs = ({
  codes,
  refs,
  onChange,
  onKey,
  setFocus,
}: Props) => (
  <div className="flex gap-1 mb-5">
    {codes.map((c, i) => (
      <Input
        key={i}
        ref={(el) => {
          refs.current[i] = el;
        }}
        value={c}
        maxLength={1}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value, i)
        }
        onKeyDown={(e) => onKey(e, i)}
        className="w-11 h-11 text-center rounded-[8px] bg-white/30 backdrop-blur-lg text-white border-none focus-visible:ring-1 font-semibold text-xl"
      />
    ))}
  </div>
);
