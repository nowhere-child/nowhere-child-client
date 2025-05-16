import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateRecord } from "@/hooks/useRecord";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [gameId, setGameId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [missionOrder, setMissionOrder] = useState("");

  const updateRecordMutation = useUpdateRecord();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameIdNum = parseInt(gameId, 10);
    const memberIdNum = parseInt(memberId, 10);
    const missionOrderNum = parseInt(missionOrder, 10);

    if (isNaN(gameIdNum) || isNaN(memberIdNum) || isNaN(missionOrderNum)) {
      toast.error("모든 필드에 유효한 숫자를 입력해주세요.");
      return;
    }

    try {
      await updateRecordMutation.mutateAsync({
        gameId: gameIdNum,
        memberId: memberIdNum,
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">어드민 페이지 - 기록 업데이트</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
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
    </div>
  );
}
