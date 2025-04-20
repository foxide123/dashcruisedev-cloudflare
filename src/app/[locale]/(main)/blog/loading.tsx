import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="min-h-[100vh]">
      <Skeleton
        className={cn(
          "mx-auto",
          "lg:h-[625px]",
          "lg:py-10",
          "lg:w-[75vw]",
          "w-[85vw]",
          "shadow-sm"
        )}
      />
    </div>
  );
}
