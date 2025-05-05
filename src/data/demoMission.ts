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
          text: "그가 주로 머물던 곳… 그 공간. \n 분명 무언가를 숨기고 있었어. \n아픈 아이들이 문을 열고 들어갔고,누군가는 컵라면을 먹으며 웃고 있었지.하지만 웃음은 오래가지 않았어.1층에선 커피 향이 퍼졌고,소파에 누군가 몸을 웅크린 채 잠들어 있었지.TV는 꺼져 있었고, 창밖은… 해가 지지 않았어.시간이 멈춘 것처럼.",
        } as const,
        {
          type: "TXT",
          text: "칠판에 끄적이는 소리가 들리다가,돌아서면 계산대에서 ‘삑’ 소리가 났어.그건 마치—사람보다 먼저 반응하는 무언가 같았지.거긴 어디일까?하지만 하나 확실한 건—그곳엔 수업이 없었어.모두가 뭔가를 준비하고 있었지만,누구도 정해진 자리에 앉진 않았고유니폼은 없었지.",
        } as const,
        {
          type: "TXT",
          text: "그런데도…이상하게도, 각자의 소속은 분명했어.그 공간은 단순하지 않았어.그는 거기서 ‘뭔가’를 꾸미고 있었던 거야.",
        } as const,
      ],
      answerBar: {
        mode: "INPUT_TEXT",
        //솔루션검증제거 백으로 넘기기
        solution: "15,27",
        placeholder: "예) 15,27",
      } as const,
    },

    {
      id: "good_job",
      blocks: [
        { type: "TITLE", text: "Perfect!" } as const,
        { type: "TXT", text: "다음 장소로 이동해라." } as const,
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
        { type: "TXT", text: "다음 장소로 이동해라." } as const,
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
        { type: "TXT", text: "다음 장소로 이동해라." } as const,
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
        { type: "TXT", text: "다음 장소로 이동해라." } as const,
      ],
      answerBar: {
        mode: "BUTTON",
        label: "다음 미션",
      } as const,
    },
  ],
};
