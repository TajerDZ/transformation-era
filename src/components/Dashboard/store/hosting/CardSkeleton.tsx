import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

function CardSkeleton() {
  return (
    <Card className="shadow-none rounded-2xl p-4 max-md:p-4 bg-[#F2F3FF]">
      <div className="space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div>
          <Table>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm font-semibold text-[#444444]">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-[#444444]">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </Card>
  );
}

export default CardSkeleton;
