interface AudioProps {
  text: string;
}

function Audio({ text }: AudioProps) {
  return (
    <div>
      <p className="text-center mb-4">오디오를 꼭 들어주세요!</p>
      <audio controls src={text}>
        브라우저가 오디오 요소를 지원하지 않습니다.
      </audio>
    </div>
  );
}

export default Audio;
