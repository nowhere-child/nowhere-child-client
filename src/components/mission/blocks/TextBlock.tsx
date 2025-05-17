interface TextBlockProps {
  text: string; // \n 으로 분할된 텍스트
}

function TextBlock({ text }: TextBlockProps) {
  return (
    <div>
      <div className="flex bg-[#F2F2F2] text-[#191919] font-jihye p-5 text-2xl max-h-[90vh] overflow-y-hidden text-nowrap">
        {text}
      </div>
    </div>
  );
}

export default TextBlock;
