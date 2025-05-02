import { Button } from "@/components/ui/button";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { collegeList } from "@/constants/collegeList";
import {
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { ChevronDown, Circle } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type Props = { onDup: () => void };

/** 공통 인풋 & 셀렉트 스타일 */
const inputClass =
  "h-[46px] rounded-[12px] px-[14px] bg-transparent border border-[#313131] focus:border-[#E1E1E1] focus-visible:ring-0 w-full text-[#FCFCFC]";

const triggerClass = `
h-[46px] rounded-[12px] px-[14px] bg-transparent border w-full
  flex justify-between items-center
  text-start text-[#FCFCFC]
  data-[placeholder]:text-zinc-400/70
  border-[#313131]
  focus:border-[#313131]
`;

export const ProfileFormFields = ({ onDup }: Props) => {
  const form = useFormContext();

  /** 현재 선택된 단과 */
  const selectedCollege = form.watch("college") || "";

  /** 단과에 매칭되는 학부/과 배열 */
  const deptOptions = useMemo(() => {
    const match = collegeList.find((c) => c.college === selectedCollege);
    return match ? match.department : [];
  }, [selectedCollege]);

  /** 단과 변경 → 학부/과 리셋 */
  const handleCollegeChange = (v: string) => {
    form.setValue("college", v, { shouldValidate: true });
    form.setValue("department", ""); // reset
  };

  /** 공통 라벨 + 필수표시 */
  const Label = ({ text }: { text: string }) => (
    <label
      className={`text-[15px] font-medium flex items-start gap-[2px] ${text === "팀 명" && "mb-4"}`}
    >
      {text}
      <Circle size={4} color="#3182F6" fill="#3182F6" />
    </label>
  );

  /** 필드 래퍼 – 왼쪽 라벨, 오른쪽 컨트롤 */
  const FieldRow: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
  }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center gap-4">
        <Label text={label} />
        <div className="flex-1 min-w-0 max-w-[230px]">{children}</div>
      </div>
    </div>
  );

  return (
    <>
      {/* 팀 명 + 중복 확인 */}
      <FormField
        name="teamName"
        control={form.control}
        render={({ field }) => (
          <FieldRow label="팀 명">
            <div className="flex gap-2 items-center">
              <FormControl>
                <Input {...field} placeholder="Text" className={inputClass} />
              </FormControl>
              <Button
                type="button"
                size="sm"
                disabled={
                  String(field.value).length < 2 ||
                  String(field.value).length > 13
                }
                onClick={onDup}
                className="h-8 rounded-[12px] px-2 py-[6px] bg-[#3182F6] text-xs font-medium"
              >
                중복 확인
              </Button>
            </div>

            {/* 헬퍼 + 메시지 */}
            <p className="mt-2 text-[11px] text-neutral-400 leading-none">
              2~13자 이하 입력
            </p>
          </FieldRow>
        )}
      />
      {/* 이름 */}
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FieldRow label="이름">
            <FormControl>
              <Input
                {...field}
                placeholder="이름을 입력해주세요."
                className={inputClass}
              />
            </FormControl>
          </FieldRow>
        )}
      />
      {/* ▼ 단과대학 */}
      <FormField
        name="college"
        control={form.control}
        render={({ field }) => (
          <FieldRow label="단과대학">
            <Select value={field.value} onValueChange={handleCollegeChange}>
              <SelectTrigger
                className={`${triggerClass} data-[state=open]:border-[#FCFCFC] `}
              >
                <SelectValue placeholder="단과대학을 선택해주세요." />
                <ChevronDown size={18} className="text-zinc-400 shrink-0" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                align="center"
                sideOffset={12}
                style={{ width: "var(--radix-select-trigger-width)" }}
                className="rounded-[16px] bg-white text-black shadow-lg z-[999]"
              >
                <div className="max-h-60 rounded-[16px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300">
                  <SelectGroup className="py-2">
                    {collegeList.map(({ college }) => (
                      <SelectItem
                        key={college}
                        value={college}
                        className="px-6 py-3 data-[state=checked]:bg-neutral-100 cursor-pointer"
                      >
                        {college}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </div>
              </SelectContent>
            </Select>
          </FieldRow>
        )}
      />
      {/* ▼ 학부/과 – deptOptions 가 빈배열이면 disabled 처리 */}
      <FormField
        name="department"
        control={form.control}
        render={({ field }) => (
          <FieldRow label="학부/과">
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={deptOptions.length === 0}
            >
              <SelectTrigger
                className={`${triggerClass} ${deptOptions.length === 0 && "opacity-30"} data-[state=open]:border-[#FCFCFC]`}
              >
                <SelectValue placeholder="학부/과를 선택해주세요." />
                <ChevronDown size={18} className="text-zinc-400 shrink-0" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                align="center"
                side="bottom"
                sideOffset={12}
                style={{ width: "var(--radix-select-trigger-width)" }}
                className="rounded-[16px] bg-white text-black shadow-lg"
              >
                <div className="max-h-60 rounded-[16px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300">
                  <SelectGroup className="py-2 bg-white">
                    {deptOptions.map((dept) => (
                      <SelectItem
                        key={dept}
                        value={dept}
                        className="px-6 py-3 data-[state=checked]:bg-neutral-100 cursor-pointer
                        rounded-[16px]
                        "
                      >
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </div>
              </SelectContent>
            </Select>
          </FieldRow>
        )}
      />
      {/* 입학년도 */}
      <FormField
        name="year"
        control={form.control}
        render={({ field }) => (
          <FieldRow label="입학년도">
            <FormControl>
              <Input
                {...field}
                type="number"
                inputMode="numeric"
                placeholder="입학년도를 입력해주세요."
                className={inputClass}
              />
            </FormControl>
          </FieldRow>
        )}
      />
    </>
  );
};
