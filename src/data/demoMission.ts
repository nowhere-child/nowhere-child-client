import { MissionScenario } from "@/types/mission";

/* as const 모든 문자열을 literal 로 고정 */
export const demoMission: MissionScenario = {
  missionId: "demo_mission",

  steps: [
    {
      id: "welcome",
      title: "Night Skull: Chapter 1",
      blocks: [
        {
          type: "TXT",
          preset: "Note",
          text: "그가 주로 머물던 곳… 그 공간. \n 분명 무언가를 숨기고 있었어. \n아픈 아이들이 문을 열고 들어갔고,누군가는 컵라면을 먹으며 웃고 있었지.하지만 웃음은 오래가지 않았어.1층에선 커피 향이 퍼졌고,소파에 누군가 몸을 웅크린 채 잠들어 있었지.TV는 꺼져 있었고, 창밖은… 해가 지지 않았어.시간이 멈춘 것처럼.",
        } as const,
        {
          type: "TXT",
          preset: "Note",
          text: "칠판에 끄적이는 소리가 들리다가,돌아서면 계산대에서 ‘삑’ 소리가 났어.그건 마치—사람보다 먼저 반응하는 무언가 같았지.거긴 어디일까?하지만 하나 확실한 건—그곳엔 수업이 없었어.모두가 뭔가를 준비하고 있었지만,누구도 정해진 자리에 앉진 않았고유니폼은 없었지.",
        } as const,
        {
          type: "TXT",
          preset: "Note",
          text: "그런데도…이상하게도, 각자의 소속은 분명했어.그 공간은 단순하지 않았어.그는 거기서 ‘뭔가’를 꾸미고 있었던 거야.",
        } as const,
      ],
      answerBar: {
        mode: "INPUT_TEXT",
        //솔루션검증제거 백으로 넘기기
        solution: "학생회관",
        placeholder: "예) 학생회관",
      } as const,
    },

    {
      id: "good_job",
      title: "Night Skull: Chapter 1",
      blocks: [
        {
          type: "TXT",
          text: "정확히 말하면, 오늘은 매우 중요한 날이야.\n보통 날이 아니야, 특별한 일이 일어날 거야.\n기다리던 순간이 드디어 찾아왔어.\n술래잡기처럼 우리는 언제나 따라갔지.\n관심이 가는 게 많지만 항상 집중해야 해.\n지금 많은 일이 있었지만 앞으로가 중요해.\n하늘이 맑고, 오늘은 좋은 기회야.\n1시간만 더 기다리면 전환점이 올 거야.\n층을 내려가면 그걸 찾을 수 있어",
          preset: "Letter",
        } as const,
        {
          type: "TXT",
          text: "정확히 기억해, 그건 네가 찾을 수 있어.\n성공을 위해선 조금 더 힘을 내야 해.\n연속되는 여정에서 우리가 승리할 거야.\n사람들이 우릴 의심하겠지만 끝까지 가자.\n물건은 네가 이미 알고 있을 거야.\n함께하는 지금을 절대 잊지 말자.",
          preset: "Letter",
        } as const,
      ],
      answerBar: {
        mode: "INPUT_TEXT",
        solution: "학생회관",
        placeholder: "예) 학생회관",
      } as const,
    },
    {
      id: "good_job",
      blocks: [
        { type: "TITLE", text: "Perfect!" } as const,
        { type: "TXT", text: "다음 장소로 이동해라.", preset: "Note" } as const,
      ],
      answerBar: {
        mode: "BUTTON",
        label: "다음 미션",
      } as const,
    },
    {
      id: "good_job",
      blocks: [
        { type: "TITLE", text: "Perfect!" } as const,
        { type: "TXT", text: "다음 장소로 이동해라.", preset: "Note" } as const,
      ],
      answerBar: {
        mode: "BUTTON",
        label: "다음 미션",
      } as const,
    },
    {
      id: "good_job",
      blocks: [
        { type: "TITLE", text: "Perfect!" } as const,
        { type: "TXT", text: "다음 장소로 이동해라.", preset: "Note" } as const,
      ],
      answerBar: {
        mode: "BUTTON",
        label: "다음 미션",
      } as const,
    },
  ],
};
