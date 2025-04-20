import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
    return (<Skeleton className={cn("w-screen", "lg:h-[530px]", "aspect-video")}/>)
  }