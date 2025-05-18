/* src/components/rank/BigRankingCard.tsx */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  place: number; // 1,2,3 …
  teamName: string;
  score: number;
  firstMemberDepartment: string;
  secondMemberDepartment?: string;
}
export default function BigRankingCard({
  place,
  teamName,
  score,
  firstMemberDepartment,
  secondMemberDepartment,
}: Props) {
  return (
    <Card
      className="relative border-2 border-blue-500 bg-white text-black
                     rounded-xl w-[280px] h-[140px] shrink-0 p-1"
    >
      <Badge className="absolute -top-0 left-6 -translate-y-1/2 bg-blue-500 text-white px-4 py-0.5 text-xl">
        {place}st
      </Badge>

      <CardContent className="px-3 py-3 space-y-1">
        <p className="font-medium truncate text-2xl">{teamName}</p>
        <div className="flex gap-1">
          <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-xl">
            {firstMemberDepartment}
          </span>
          {secondMemberDepartment && (
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-xl">
              {secondMemberDepartment}
            </span>
          )}
        </div>
        <p className="text-right font-semibold mt-4 text-2xl">{score}점</p>
      </CardContent>
    </Card>
  );
}
