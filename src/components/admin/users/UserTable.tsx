/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useGetAllUsersQuery } from "@/redux/api/endpoints/auth.api";
import { TUser } from "@/applicationTypes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableLoader, TableNoResult } from "@/helpers/TableLoader";
import { formateDate } from "@/helpers/formateDate";
import UserAction from "./UserAction";
import { TableSkeleton } from "@/helpers/TableSkeleton";
import TablePagination from "@/helpers/TablePagination";

export default function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("Name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const {
    data: allUsers,
    isLoading,
    isError,
  } = useGetAllUsersQuery({
    limit,
    page,
    searchTerm,
    sortField,
    sortOrder,
  });
  console.log(allUsers?.data);

  const { currentPage, limitPage, totalPage } = allUsers?.metaData || {};

  const handleSort = useCallback(
    (field: string) => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortField(field);
    },
    [sortOrder, setSortField]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );
  const truncateId = (id: string) => {
    return id.slice(0, 8) + "...";
  };
  if (isError) {
    return <div>Failed to fetch</div>;
  }
  return (
    <div className=" space-y-4 ">
      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        className="max-w-60"
      />
      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  Email <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Photo</TableHead>
              <TableHead className="w-32">
                <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                  create Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("role")}>
                  Role <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton
                rowLength={3}
                cellLength={7}
                key={"table_skeleton"}
              />
            ) : allUsers?.data?.length === 0 ? (
              <TableNoResult />
            ) : (
              allUsers.data.map((user: TUser) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{truncateId(user?._id)}</TooltipTrigger>
                        <TooltipContent>
                          <p>{user._id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className=" ">
                    {user.photo ? (
                      <Image
                        src={user.photo}
                        alt={`${user.name}'s photo`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="w-20 ">
                    {formateDate(user?.createdAt)}
                  </TableCell>
                  <TableCell className="w-20 ">{user.role}</TableCell>
                  <UserAction userId={user._id} />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* table */}
      {/* pagination........ */}
      <TablePagination
        currentPage={currentPage}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        key={"userPagination"}
      />
    </div>
  );
}
