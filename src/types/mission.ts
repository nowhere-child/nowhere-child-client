export type Preset = "Note" | "Sticky" | "Letter";

/** ①콘텐츠 블록 -------------------------------------------------- */
export type Block =
  | { type: "TITLE"; text: string }
  | { type: "TXT"; text: string; preset: Preset }
  | { type: "IMG"; src: string; alt?: string; height?: number }
  | { type: "CAR"; images: string[]; autoplay?: number }
  | { type: "CODE"; text: string }; // 고정폭 암호문
/* AI대화, 지도 등 특수 블록은 나중에 추가 가능 */

/** ②답안 입력 바 ------------------------------------------------- */
export type AnswerBarConfig =
  | {
      mode: "INPUT_TEXT";
      solution: string;
      placeholder?: string;
    }
  | {
      mode: "BUTTON";
      label?: string;
    }
  | {
      mode: "INPUT_DPAD";
      solution: ("UP" | "DOWN" | "LEFT" | "RIGHT")[];
    };

/** ③미션 스텝 ---------------------------------------------------- */
export interface Step {
  id: string; // step_001 …
  title?: string; // 화면 상단 타이틀 (선택)
  blocks: Block[]; // 화면 구성 블록
  answerBar: AnswerBarConfig; // 입력 모드
}

/** ④시나리오 JSON 루트 ------------------------------------------ */
export interface MissionScenario {
  missionId: string;
  steps: Step[];
}
