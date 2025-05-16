import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <Card className="shadow-none rounded-lg p-2 max-md:p-2">
      <div className="space-y-4 flex flex-col h-full">
        <div className="border rounded-lg p-2 flex items-center justify-center">
          <Skeleton className="h-36 w-full" />
        </div>
        <div className="space-y-2 flex flex-col justify-between flex-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
    </Card>
  );
}

export default CardSkeleton;
