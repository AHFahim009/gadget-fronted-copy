import { TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export const TableLoader = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="h-24 text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
      </TableCell>
    </TableRow>
  );
};

export const TableNoResult = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};
