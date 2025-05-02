import { useMissionStore } from "@/store/missionStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useEnterCode() {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const [isFocused, setIsFocused] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const navigate = useNavigate();
  const { setCode } = useMissionStore();
  const isComplete = codes.every((c) => c.trim() !== "");

  const change = (v: string, i: number) => {
    if (v.length > 1) return;
    const next = [...codes];
    next[i] = v.toUpperCase();
    setCodes(next);
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const backspace = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !codes[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const submit = () => {
    if (!isComplete) return;
    setCode(codes.join(""));
    navigate("/profile");
  };

  return {
    codes,
    setCodes: change,
    backspace,
    inputRefs,
    isFocused,
    setIsFocused,
    isComplete,
    submit,
  };
}
