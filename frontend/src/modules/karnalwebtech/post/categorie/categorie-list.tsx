
import List_table from "@/components/common/table/List_table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Switch, Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";

import { useActionMutation } from "@/state/expenseApi";
import { Expences_List_Props, Get_Response } from "@/types/expense_type";
import { useAllQuery, useStatus_actionMutation } from "@/state/usersApi";
import { columns, INITIAL_VISIBLE_COLUMNS } from "@/types/auth_type";
import debounce from "lodash.debounce";
import Shadcn_table from "@/components/common/shadcn-table/table";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { TableCell, TableRow } from "@/components/ui/table";
import { TimeAgo } from "@/lib/service/time/timeAgo";
import { useSearch } from "@/hooks/useSearch";

interface Customer_list_props {
  set_open: (value: boolean) => void;
  edit_handler: (value: any) => void;
}

const CategorieList: React.FC<Customer_list_props> = ({
  set_open,
  edit_handler,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<'title' | 'category'>('title')
  const { data, error, isLoading } = useGetAllcategorieQuery({
    rowsPerPage: rowsPerPage,
    page: page,
  });
  const {  searchTerm,
    setSearchTerm,
    filteredItems,}= useSearch(data?.result,[searchField])
  console.log(data)
  const table_header: string[] = ["Title", "	Author", "Date", "Status"]
  function tabel_body(){
    return(
      filteredItems?.map((post: any) => (
        <TableRow key={post._id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.audit_log?.name}</TableCell>
            <TableCell>{<TimeAgo time={post.updatedAt} />}</TableCell>
            <TableCell>{post.status}</TableCell>
        </TableRow>
    ))
    )
  }
  return (
    <Shadcn_table table_header={table_header} tabelBody={data?.result} tabel_body={tabel_body} 
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    />
  );
};

export default CategorieList;
