interface SingleButtonProps {
  handleNext: () => void;
  setV: React.Dispatch<React.SetStateAction<string>>;
}

function SingleButton({ handleNext, setV }: SingleButtonProps) {
  const handleClick = () => {
    setV("OK");
    handleNext();
  };
  return (
    <div className="px-5 pb-6 safe-bottom">
      <button
        onClick={handleClick}
        className="w-full px-4 py-2 rounded-[20px] bg-sky-200 text-black text-lg font-bold"
      >
        {"확인"}
      </button>
    </div>
  );
}

export default SingleButton;
