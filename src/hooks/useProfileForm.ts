import { useMissionStore } from "@/store/missionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSignup } from "./useMember";
import { useCheckTeamName } from "./useTeam";

export const profileSchema = z.object({
  teamName: z.string().min(2).max(13),
  name: z.string().min(2),
  college: z.string().nonempty(),
  department: z.string().nonempty(),
  yearOfAdmission: z.coerce
    .number()
    .int()
    .gte(2000)
    .lte(new Date().getFullYear()),
  agreePrivacy: z.boolean().refine((v) => v === true),
  agreeSecret: z.boolean().refine((v) => v === true),
  phoneNumber: z.string().regex(/^\d{11}$/, "11자리 숫자만 입력해주세요."),
  gameId: z.number(),
  authenticateCode: z.number(),
  role: z.enum(["ROLE_USER", "ROLE_ADMIN"]),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export function useProfileForm() {
  const navigate = useNavigate();
  const { code, role } = useMissionStore();
  const { mutateAsync: signUp } = useSignup();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      teamName: "", // 빈 문자열
      name: "",
      college: "",
      department: "",
      phoneNumber: "",
      yearOfAdmission: undefined, // ""로 두고, 입력하면 자동으로 숫자 변환됨
      agreePrivacy: false, // false로 시작
      agreeSecret: false,
      gameId: 1,
      authenticateCode: Number(code),
      role: role,
    },
  });
  const name = form.getValues("teamName");
  const { mutateAsync: checkTeamName } = useCheckTeamName(name);

  /** 팀명 중복 확인 */
  const checkDuplicate = async () => {
    const name = form.getValues("teamName");
    if (!name) return;
    const { code } = await checkTeamName();
    if (code !== 200) {
      // 중복된 팀명
      form.setError("teamName", { message: "이미 사용 중인 팀명입니다." });
    } else {
      form.clearErrors("teamName");
      alert("사용 가능한 팀명입니다.");
    }
  };

  /** 최종 제출 */
  const onSubmit = form.handleSubmit(async (data) => {
    const { code: signUpCode } = await checkTeamName();
    if (signUpCode !== 200) {
      form.setError("teamName", { message: "이미 사용 중인 팀명입니다." });
      return;
    }
    console.log("제출 데이터", data);
    const { code, data: submitData } = await signUp(data);
    console.log("회원가입 결과", code);
    if (code !== 200) {
      // 실패 시
      console.error("회원가입 실패", code);
      form.setError("teamName", { message: "회원가입에 실패했습니다." });
    } else {
      // 성공 시
      console.log("회원가입 성공", submitData, code);
      navigate("/mission");
    }
    // => 성공 시 다음 라우트로 이동
  });

  return { form, checkDuplicate, onSubmit };
}
