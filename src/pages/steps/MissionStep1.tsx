// src/pages/steps/MissionStep1.tsx
const MissionStep1 = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">1단계 미션</h2>
      <p className="mb-2">숫자 퍼즐을 완성하라. 모든 칸을 채워야 한다.</p>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="정답을 입력하세요"
      />
    </div>
  );
};

export default MissionStep1;
