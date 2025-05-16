interface ImageBlockProps {
  text: string; // \n 으로 분할된 텍스트
}

function ImageBlock({ text }: ImageBlockProps) {
  return (
    <div>
      <img
        src={text}
        alt="Image Block"
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
}

export default ImageBlock;
