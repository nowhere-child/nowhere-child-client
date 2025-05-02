import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkTeamName, submitProfile } from "../api/client";

export const profileSchema = z.object({
  teamName: z.string().min(2).max(13),
  name: z.string().min(2),
  college: z.string().nonempty(),
  department: z.string().nonempty(),
  year: z.coerce.number().int().gte(2000).lte(new Date().getFullYear()),
  agreePrivacy: z.boolean().refine((v) => v === true),
  agreeSecret: z.boolean().refine((v) => v === true),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export function useProfileForm() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      teamName: "", // 빈 문자열
      name: "",
      college: "",
      department: "",
      year: undefined, // ""로 두고, 입력하면 자동으로 숫자 변환됨
      agreePrivacy: false, // false로 시작
      agreeSecret: false,
    },
  });

  /** 팀명 중복 확인 */
  const checkDuplicate = async () => {
    const name = form.getValues("teamName");
    if (!name) return;
    const ok = await checkTeamName(name);
    console.log(ok);
    if (!ok) {
      form.setError("teamName", { message: "이미 사용 중인 팀명입니다." });
    } else {
      form.clearErrors("teamName");
    }
  };

  /** 최종 제출 */
  const onSubmit = form.handleSubmit(async (data) => {
    await submitProfile(data);
    // => 성공 시 다음 라우트로 이동
  });

  return { form, checkDuplicate, onSubmit };
}
