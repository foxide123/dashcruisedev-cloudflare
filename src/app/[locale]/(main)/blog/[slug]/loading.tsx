import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="min-h-[100vh] lg:w-[75vw] w-[85vw] mx-auto flex justify-center">
      <Skeleton
        className={cn(
          "w-[200px]",
          "h-[350px]",
          "mt-50",
          "mr-20",
        )}/>
      <Skeleton
        className={cn(
          "mx-auto",
          "lg:w-[40vw]",
          "lg:h-screen",
          "w-[85vw]",
          "mx-auto"
        )}
      />
      <Skeleton className={cn(
        "h-[250px]",
        "w-[200px]",
        "mt-50",
        "ml-20",
        "py-5",
        "rounded-sm"
      )}/>
    </div>
  );
}
