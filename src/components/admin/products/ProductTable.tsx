"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";
import { useGetAllProductsQuery } from "@/redux/api/endpoints/product.api";
import { TableSkeleton } from "@/helpers/TableSkeleton";
import { TableNoResult } from "@/helpers/TableLoader";
import { TProductRes } from "@/applicationTypes/applicationTypes";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ProductTable = () => {
  const { data: allProducts, isLoading, isError } = useGetAllProductsQuery("");

  if (isError) {
    return <div>Failed to fetched data</div>;
  }

  const truncateDescription = (des: string) => {
    return des.slice(0, 28) + "...";
  };
  const truncateId = (id: string) => {
    return id.slice(0, 8) + "...";
  };
  return (
    <div className="space-y-4 ">
      <CreateProductModal />
      {/* table */}
      <div className="rounded-md border w-full ">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="whitespace-nowrap  min-w-56 w-56">
                Description
              </TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cellLength={8} />
            ) : allProducts?.data.length === 0 ? (
              <TableNoResult />
            ) : (
              allProducts?.data.map((product: TProductRes) => {
                const {
                  _id,
                  category,
                  description,
                  name,
                  price,
                  stock,
                  photo,
                } = product || {};
                return (
                  <TableRow key={_id}>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{truncateId(_id)}</TooltipTrigger>
                          <TooltipContent>
                            <p>{_id}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Image
                              src={photo}
                              alt={name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover w-10 aspect-square"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <Image
                              src={photo}
                              alt={name}
                              width={200} // Adjust width for preview
                              height={200}
                              className="rounded-md object-cover"
                            />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{stock}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {truncateDescription(description)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="">
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      {/* table */}
    </div>
  );
};
export default ProductTable;
