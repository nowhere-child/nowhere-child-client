import { useAuth } from "@/contexts/AuthContext";
import { useMissionStore } from "@/store/missionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSignup } from "./useMember";

import { SignupParams } from "@/api/member";
import { toast } from "sonner";
import { useCheckTeamName } from "./useTeam";

export const createProfileSchema = (isLeader: boolean) =>
  z.object({
    // teamName: z.string().min(2).max(13).optional(),
    teamName: isLeader ? z.string().min(2).max(8) : z.string().optional(), // 리더가 아니면 팀명은 선택 사항

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

export type ProfileForm = z.infer<ReturnType<typeof createProfileSchema>>;

export function useProfileForm() {
  const navigate = useNavigate();
  const { code, role, isLeader, setMissionId, setNickname } = useMissionStore();
  const { mutateAsync: signUp } = useSignup();
  const { login } = useAuth();

  // isLeader 값에 따라 스키마 결정
  const currentProfileSchema = createProfileSchema(isLeader);

  console.log("useProfileForm", code, role, isLeader);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(currentProfileSchema),
    mode: "onChange",
    defaultValues: {
      teamName: isLeader ? "" : undefined, // 리더가 아니면 teamName은 초기에 비워둠
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
  const name = form.getValues("teamName") || "";
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
    if (isLeader) {
      const teamNameToSubmit = data.teamName;
      if (!teamNameToSubmit) {
        form.setError("teamName", { message: "팀명을 입력해주세요." });
        return;
      }
      // 제출 직전에도 팀명 중복 검사 (선택 사항이지만 권장)
      try {
        // 위 checkDuplicate와 마찬가지로 checkTeamName 호출 방식 확인 필요
        const result = await checkTeamName(); // data.teamName으로 다시 검사해야 할 수 있음
        if (result.code !== 200) {
          toast.error("이미 사용 중인 팀명입니다. 다른 팀명을 사용해주세요.");
          return;
        }
      } catch (e) {
        toast.error("팀명 중복 확인 중 오류가 발생했습니다.");
        console.error("팀명 중복 확인 오류:", e);
        return;
      }
    }

    // 리더가 아닐 경우, 서버에서 teamName을 어떻게 처리할지에 따라 빈 문자열 또는 null 등으로 설정
    const { teamName: _teamName, ...restData } = data;

    const submissionData = isLeader ? data : restData; // teamName 제거

    console.log("제출 데이터", submissionData);

    try {
      const { code: signUpResponseCode, data: submitData } = await signUp(
        submissionData as SignupParams
      );
      console.log("회원가입 결과", signUpResponseCode);

      if (signUpResponseCode !== 200) {
        console.error("회원가입 실패", signUpResponseCode);
        // 구체적인 에러 메시지를 서버로부터 받아 표시하는 것이 좋습니다.
        form.setError("root.serverError", {
          message: "회원가입에 실패했습니다. 입력 정보를 다시 확인해주세요.",
        });
      } else {
        login(submitData.accessToken, submitData.refreshToken);
        setMissionId(1); // 초기 미션 ID 설정
        setNickname(submissionData.name); // Zustand 스토어에 닉네임 저장
        console.log("회원가입 성공", submitData);
        navigate("/mission");
      }
    } catch (error) {
      console.error("회원가입 API 호출 오류:", error);
      form.setError("root.serverError", {
        message: "회원가입 중 예기치 않은 오류가 발생했습니다.",
      });
    }
  });

  return { form, checkDuplicate, onSubmit, isLeader };
}
