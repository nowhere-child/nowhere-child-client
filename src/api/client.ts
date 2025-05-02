import { ProfileForm } from "@/hooks/useProfileForm";

/** 팀명 중복 확인 – 400 ms 딜레이 후 임의 로직 */
export async function checkTeamName(name: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 400));
  // 예: 'admin', 'test' 는 중복 처리
  return !["ADMIN", "TEST"].includes(name.toUpperCase());
}

/** 프로필 제출 – 600 ms 후 콘솔 출력 */
export async function submitProfile(data: ProfileForm): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  console.log("✔️ submitted profile", data);
}
