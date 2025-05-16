import React from "react";
import { TableCell, TableRow } from "./table";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

type TableSkeletonProps = React.FC<{
  columns?: number;
  className?: string;
}>;
const TableSkeleton: TableSkeletonProps = ({ columns = 5, className = "" }) => {
  return (
    <TableRow>
      {[...Array(columns)].map((_, index) => (
        <TableCell key={index} className="font-medium">
          <Skeleton
            className={cn(
              "w-full max-sm:w-[50px] h-[20px] rounded-md ",
              className
            )}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableSkeleton;
