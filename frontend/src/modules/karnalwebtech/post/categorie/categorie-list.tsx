
import List_table from "@/components/common/table/List_table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Switch, Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useActionMutation } from "@/state/expenseApi";
import { Expences_List_Props, Get_Response } from "@/types/expense_type";
import { useAllQuery, useStatus_actionMutation } from "@/state/usersApi";
import { columns, INITIAL_VISIBLE_COLUMNS } from "@/types/auth_type";
import debounce from "lodash.debounce";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { TableCell, TableRow } from "@/components/ui/table";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import { useSearch } from "@/hooks/useSearch";
import Shadcn_table from "@/components/common/shadcn-table/table";
import { useTableFilters } from "@/hooks/useTableFilters";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}

const CategorieList: React.FC<Customer_list_props> = ({
  set_open,
  edit_handler,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const router =useRouter();
  const [searchField, setSearchField] = useState<'title' | 'category'>('title')
  const { data, error, isLoading } = useGetAllcategorieQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
  });
  const { searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredItems, } = useTableFilters(data?.result, [searchField])

  const table_header: string[] = ["Title", "	Author", "Date", "Status", "Action"]
  const categorie_dropdown: any[] = []

  function tabel_body() {
    return (
      filteredItems?.map((post: any) => (
        <TableRow key={post._id}>
          <TableCell className="font-medium">{post.title}</TableCell>
          <TableCell>{post.audit_log?.name}</TableCell>
          <TableCell>{<TimeAgo time={post.updatedAt} />}</TableCell>
          <TableCell>{post.status}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(post._id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>router.push(`/karnalwebtech/post/categorie/${post._id}`)}>Edit Categorie</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </TableCell>
        </TableRow>
      ))
    )
  }
  return (
    <Shadcn_table
      table_header={table_header}
      tabelBody={data?.result}
      tabel_body={tabel_body}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      drop_down_selector={categorie_dropdown}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      currentPage={page}
      setCurrentPage={setPage}
      data_length={data?.data_counter}
      isLoading={isLoading} />
  );
};

export default CategorieList;
