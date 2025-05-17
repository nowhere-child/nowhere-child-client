import { useAuth } from "@/contexts/AuthContext";
import { useMissionStore } from "@/store/missionStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckAuthCode } from "./useMember";

export function useEnterCode() {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const [isFocused, setIsFocused] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const navigate = useNavigate();
  const { mutateAsync: checkAuthCode } = useCheckAuthCode();
  const { login } = useAuth();
  const isComplete = codes.every((c) => c.trim() !== "");
  const { setCode, setRole } = useMissionStore();

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

  const submit = async () => {
    if (!isComplete) return;
    const { code, data } = await checkAuthCode(Number(codes.join("")));
    if (code === 200) {
      setCode(codes.join(""));
      if (data.participated === true) {
        login(data.jwtResponse.accessToken, data.jwtResponse.refreshToken);
        navigate("/mission");
      } else {
        setRole(data.isLeader ? "ROLE_ADMIN" : "ROLE_USER");
        navigate("/profile");
      }
    }
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
