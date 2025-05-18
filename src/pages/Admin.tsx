import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/hooks/useMember";
import { useUpdateRecord } from "@/hooks/useRecord";
import { useIssueTeam } from "@/hooks/useTeam";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [gameId, setGameId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [missionOrder, setMissionOrder] = useState("");

  // 코드생성
  const [generationGameId, setGenerationGameId] = useState(0);
  const [teamSize, setteamSize] = useState("");
  const [createdCode, setCreatedCode] = useState({
    authenticateCodeList: [-1],
  });

  const ADMIN_PASSWORD = "0049"; // 실제 운영 환경에서는 환경 변수 등을 사용하는 것이 좋습니다.
  // 비밀번호 관련 상태
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //

  const updateRecordMutation = useUpdateRecord();
  const createTeam = useIssueTeam();

  const { mutateAsync: adminlogin } = useLogin();
  const { login: authLogin } = useAuth();

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("관리자 인증 성공!");
      setEnteredPassword(""); // 입력 필드 초기화
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
      setEnteredPassword(""); // 입력 필드 초기화
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameIdNum = parseInt(gameId, 10);
    const missionOrderNum = parseInt(missionOrder, 10);

    if (isNaN(gameIdNum) || isNaN(missionOrderNum)) {
      toast.error("모든 필드에 유효한 숫자를 입력해주세요.");
      return;
    }

    // MARK: TODO : 유저 업데이트 memberID관련 수정(없어진것 처리)

    try {
      await updateRecordMutation.mutateAsync({
        gameId: gameIdNum,
        missionOrder: missionOrderNum,
      });
      toast.success("기록이 성공적으로 업데이트되었습니다.");
      // 성공 후 입력 필드 초기화
      setGameId("");
      setMemberId("");
      setMissionOrder("");
    } catch (error) {
      toast.error("기록 업데이트 중 오류가 발생했습니다.");
      console.error("기록 업데이트 오류:", error);
    }
  };

  // 코드 생성 핸들러 (추후 구현)
  const handleGenerateCode = async () => {
    const { data: createdCode } = await createTeam.mutateAsync({
      gameId: generationGameId,
      teamSize,
    });
    console.log("코드 생성:", createdCode);
    setCreatedCode(createdCode);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">관리자 인증</h1>
        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-4 max-w-xs w-full"
        >
          <div>
            <Label htmlFor="adminPassword">비밀번호</Label>
            <Input
              id="adminPassword"
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="관리자 비밀번호를 입력하세요"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            인증
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">어드민 페이지 - 기록 업데이트</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <div>
          <Label htmlFor="gameId">게임 ID</Label>
          <Input
            id="gameId"
            type="number"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="게임 ID를 입력하세요"
            required
          />
        </div>
        <div>
          <Label htmlFor="memberId">멤버 ID</Label>
          <Input
            id="memberId"
            type="number"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="멤버 ID를 입력하세요"
            required
          />
        </div>
        <div>
          <Label htmlFor="missionOrder">미션 순서</Label>
          <Input
            id="missionOrder"
            type="number"
            value={missionOrder}
            onChange={(e) => setMissionOrder(e.target.value)}
            placeholder="미션 순서를 입력하세요"
            required
          />
        </div>
        <Button type="submit" disabled={updateRecordMutation.isPending}>
          {updateRecordMutation.isPending ? "업데이트 중..." : "기록 업데이트"}
        </Button>
      </form>

      <hr className="my-8" />

      <h2 className="text-xl font-bold mb-4">코드 생성</h2>
      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="generationGameId">게임 ID (코드 생성용)</Label>
          <Input
            id="generationGameId"
            type="number"
            value={generationGameId}
            onChange={(e) => {
              const value = e.target.value;
              // 빈 문자열일 경우 0으로 설정하거나, NaN이 되지 않도록 처리
              setGenerationGameId(value === "" ? 0 : Number(value));
            }}
            placeholder="게임 ID를 입력하세요"
          />
        </div>
        <div>
          <Label htmlFor="teamSize">팀 규모</Label>
          <Input
            id="teamSize"
            type="number"
            value={teamSize}
            onChange={(e) => setteamSize(e.target.value)}
            placeholder="팀 규모를 입력하세요"
          />
        </div>
        <Button variant="secondary" onClick={handleGenerateCode}>
          코드생성
        </Button>
        <div>{createdCode.authenticateCodeList.join(", ")}</div>
      </div>
      <hr className="my-8" />
      <Button
        onClick={() => {
          adminlogin({
            name: "김도현",
            phoneNumber: "010-2430-0005",
            role: "ROLE_ADMIN",
          })
            .then((res) => {
              console.log("로그인 성공", res);
              authLogin(res.data.accessToken, res.data.refreshToken);
            })
            .catch((err) => {
              console.error("로그인 실패", err);
            });
        }}
      >
        로그인
      </Button>
    </div>
  );
}
