import { CodeInputs } from "@/components/home/CodeInputs";
import { FooterBar } from "@/components/home/FooterBar";
import { StatusMessage } from "@/components/home/StatusMessage";
import { useEnterCode } from "@/hooks/useEnterCode";
import { useIOSScrollFix } from "@/hooks/useIOSScrollFix";

const EnterCodePage = () => {
  const hook = useEnterCode();
  useIOSScrollFix(hook.isFocused);

  return (
    <div className="flex flex-col h-dvh bg-black">
      {/* 배경 이미지 영역 */}
      <div className="flex flex-col flex-1 bg-[url('../assets/bg-2x.png')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-between flex-1 px-4 pt-10">
          <h1 className="text-3xl font-bold text-white mb-6">Night Skull</h1>

          <div>
            <StatusMessage done={hook.isComplete} />
            <CodeInputs
              codes={hook.codes}
              refs={hook.inputRefs}
              onChange={hook.setCodes}
              onKey={hook.backspace}
              setFocus={hook.setIsFocused}
            />
          </div>
        </div>
      </div>
      {/* 버튼 영역 */}
      <FooterBar disabled={!hook.isComplete} onSubmit={hook.submit} />
    </div>
  );
};
export default EnterCodePage;
