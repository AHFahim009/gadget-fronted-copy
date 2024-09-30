/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TProps = {
  setPage: any;
  currentPage: number;
  totalPage: number;
  page: number;
};
const TablePagination = ({ currentPage, setPage, page, totalPage }: TProps) => {
  return (
    <div className="flex items-center  justify-center gap-3">
      <Button
        variant="outline"
        size={"sm"}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span>
        Page {page} of {totalPage}
      </span>
      <Button
        variant="outline"
        size={"sm"}
        disabled={currentPage >= totalPage}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
export default TablePagination;
