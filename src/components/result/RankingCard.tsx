"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function RankingCard() {
  return (
    <div className="max-w-full mx-auto my-10">
      <Card className="relative border-2 bg-white text-black border-blue-500 rounded-xl overflow-visible max-h-[110px] p-1">
        <div className="absolute -top-0 left-6 -translate-y-1/2">
          <Badge className="bg-blue-500 hover:bg-blue-500 text-white px-4 py-0.5 text-lg rounded-full">
            1st
          </Badge>
        </div>
        <CardContent className="px-3 py-3">
          <h3 className="mb-1">Nowhere child</h3>

          <div className="flex gap-2 mb-1">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm">
              검공
            </span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm">
              디학
            </span>
          </div>

          <div className="ml-20 text-right text-lg">423점</div>
        </CardContent>
      </Card>
    </div>
  );
}
