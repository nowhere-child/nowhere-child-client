import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const Agreements = () => {
  const { control, watch, setValue } = useFormContext();

  // 부모 폼의 필드 상태를 읽고
  const allChecked = watch("agreePrivacy") && watch("agreeSecret");

  // 부모 폼 컨트롤러로 값을 업데이트
  const toggleAll = (checked: boolean) => {
    setValue("agreePrivacy", checked, { shouldValidate: true });
    setValue("agreeSecret", checked, { shouldValidate: true });
  };

  return (
    <>
      {/* 전체 동의 */}
      <div className="bg-[#3182F63D] rounded-[12px] py-3 px-4 mb-4 flex items-center gap-3">
        <Checkbox
          checked={allChecked}
          onCheckedChange={toggleAll}
          className="size-[20px] rounded-full border-2 border-[#3182F6] text-[#3182F6]"
        >
          <Check size={20} />
        </Checkbox>
        <span className="text-[15px] font-medium text-white">
          모두 동의합니다.
        </span>
      </div>

      {/* 개별 항목 */}
      <div className="px-4 gap-2 text-[#707070] text-xs">
        <FormField
          name="agreePrivacy"
          control={control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 mb-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-none text-[#FCFCFC]"
                />
              </FormControl>
              <span>개인정보 처리방침 (필수)</span>
              <a
                href="https://yeonnybus.notion.site/1f7cd91a96d480d19e0bcfebb489df6b?pvs=4"
                target="_blank"
                className="ml-auto underline"
              >
                보기
              </a>
            </FormItem>
          )}
        />
        <FormField
          name="agreeSecret"
          control={control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-none text-[#FCFCFC]"
                />
              </FormControl>
              <span>비밀 유지 동의 (필수)</span>
              <a
                href="https://yeonnybus.notion.site/1f7cd91a96d48095a385ecb8ea51bcb0?pvs=4"
                target="_blank"
                className="ml-auto underline"
              >
                보기
              </a>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
