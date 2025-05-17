import { Agreements } from "@/components/profile/Agreements";
import { ProfileFormFields } from "@/components/profile/ProfileFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ChevronLeft } from "lucide-react";

const ProfilePage = () => {
  const { form, checkDuplicate, onSubmit } = useProfileForm();

  return (
    <div className="flex flex-col bg-[#1A1A1A] text-gray-50">
      <div className="pb-6 pt-5 pl-5">
        <ChevronLeft size={22} />
      </div>

      <h2 className="text-[22px] font-bold leading-none mb-[29px] pl-5">
        기본 정보
      </h2>

      {/* 🔵 카드 – 시안처럼 블랙에 가까운 배경 + 라운드 */}
      <div className="flex-1 overflow-y-auto">
        {/* 폼 본문 */}
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className="p-5">
              <ProfileFormFields onDup={checkDuplicate} />
              <Agreements />
            </div>

            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="flex mt-10 py-6 mx-5 my-5 rounded-[14px] bg-[#3182F6] disabled:bg-neutral-700"
            >
              다음
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
