"use client";

import MultiStepForm from "./components/multi-step-form";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Page() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embedded") === "true";

  return (
    <div className={cn(isEmbedded && "embedded", "w-full")}>
      <MultiStepForm isEmbedded={isEmbedded} />
    </div>
  );
}
