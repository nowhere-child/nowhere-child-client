export declare const COLLAGE: string[];
export type CollageType = (typeof COLLAGE)[number];

export declare const DEPARTMENT: string[];
export type DepartmentType = (typeof DEPARTMENT)[number];

export const collegeList: {
  college: Partial<CollageType>;
  department: Partial<DepartmentType>[];
}[] = [
  {
    college: "정경대학",
    department: [
      "행정학과",
      "국제관계학과",
      "경제학부",
      "사회복지학과",
      "세무학과",
    ],
  },
  {
    college: "경영대학",
    department: ["경영학부"],
  },
  {
    college: "공과대학",
    department: [
      "전자전기컴퓨터공학부",
      "화학공학과",
      "기계정보공학과",
      "신소재공학과",
      "토목공학과",
      "컴퓨터과학부",
      "인공지능학과",
    ],
  },
  {
    college: "인문대학",
    department: [
      "영어영문학과",
      "국어국문학과",
      "국사학과",
      "철학과",
      "중국어문화학과",
      "인문대학(전선)",
    ],
  },
  {
    college: "자연과학대학",
    department: [
      "수학과",
      "통계학과",
      "물리학과",
      "생명과학과",
      "환경원예학과",
      "융합응용화학과",
    ],
  },
  {
    college: "도시과학대학",
    department: [
      "도시행정학과",
      "도시사회학과",
      "건축학전공",
      "건축공학전공",
      "도시공학과",
      "교통공학과",
      "조경학과",
      "환경공학부",
      "공간정보공학과",
      "소방방재학과",
    ],
  },
  {
    college: "예술체육대학",
    department: [
      "산업디자인전공",
      "시각디자인전공",
      "조각학과",
      "음악학과",
      "스포츠과학과",
    ],
  },
  {
    college: "자유융합대학",
    department: [
      "첨단융합학부",
      "자유전공학부",
      "융합전공학부",
      // "국제도시개발학전공",
      // "도시부동산기획경영학전공",
      // "미디어콘텐츠학",
      // "도시문화콘텐츠학",
      // "동아시아문화학전공",
      // "법규범제도학",
      // "빅데이터분석학전공",
      // "융합바이오헬스전공",
      // "지능형반도체전공",
      // "첨단인공지능전공",
      // "평생교육학",
      // "창업학",
    ],
  },
];
