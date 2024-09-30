"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useGetMyOrderQuery } from "@/redux/api/endpoints/order.api.";
import { useAppSelector } from "@/redux/hooks";
import { TOrderRes } from "@/applicationTypes/applicationTypes";
import { formateDate } from "@/helpers/formateDate";
import { TShoppingCart } from "@/redux/slices/cart.slice";

type TOrder = {
  id: string;
  createdAt: string;
  name: string;
  address: string;
  totalQuantity: number;
  totalPrice: number;
};

const mockOrders: TOrder[] = [
  {
    id: "1",
    createdAt: "2024/09/30",
    name: "John Doe",
    address: "123 Main St, City, Country",
    totalQuantity: 3,
    totalPrice: 150.99,
  },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = useAppSelector((state) => state.auth.user?._id);

  const {
    data: MyOrders,
    isLoading,
    isError,
  } = useGetMyOrderQuery({ userId: userId!, page: currentPage });
  if (!userId) {
    return <div>No user</div>;
  }

  if (isError) {
    return <div>Failed to data fetching</div>;
  }
  if (isLoading) {
    return <div>loading....</div>;
  }

  const calculateQuantity = (cart: TShoppingCart[]) => {
    return cart.reduce((acc, curr) => curr.quantity + acc, 0);
  };

  const metadata = MyOrders.metaData;
  console.log(MyOrders.data, { metadata });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {metadata.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === metadata.totalPage}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MyOrders.data.map((order: TOrderRes) => {
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {formateDate(order.createdAt)}
                  </TableCell>
                  <TableCell>{order.shoppingInfo.name}</TableCell>
                  <TableCell className="">
                    {order.shoppingInfo.address}
                  </TableCell>
                  <TableCell className="">
                    {calculateQuantity(order.carts)}
                  </TableCell>
                  <TableCell className="">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
