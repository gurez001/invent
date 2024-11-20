'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TimeAgo } from '@/lib/service/time/timeAgo'
import { ValueAnimationOptions } from 'framer-motion'


interface Shadcn_table_props {
    table_header: string[];
    tabelBody: any;
    tabel_body: any;
    searchTerm:string;
    setSearchTerm:(value:string)=>void;
}
export default function Shadcn_table({ table_header, tabelBody, tabel_body,searchTerm, setSearchTerm }: Shadcn_table_props) {
    const [categoryFilter, setCategoryFilter] = useState<string>('All')
    const [statusFilter, setStatusFilter] = useState<string[]>([])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search by title or author"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex space-x-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="Programming">Programming</SelectItem>
                            <SelectItem value="API">API</SelectItem>
                        </SelectContent>
                    </Select>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[180px]">
                                Filter by Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {['Published', 'Draft', 'Review'].map((status) => (
                                <DropdownMenuCheckboxItem
                                    key={status}
                                    checked={statusFilter.includes(status)}
                                    onCheckedChange={(checked) =>
                                        setStatusFilter(prev =>
                                            checked
                                                ? [...prev, status]
                                                : prev.filter(item => item !== status)
                                        )
                                    }
                                >
                                    {status}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {table_header.map((header) => (
                            <TableHead key={header} className="cursor-pointer" 
                            // onClick={() => handleSort(header.toLowerCase() as SortConfig['key'])}
                            >
                                {header}
                                {/* <div className="flex items-center">
                                    {sortConfig.key === header.toLowerCase() ? (
                                    {header}
                                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                                    ) : (
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    )}
                                </div> */}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tabel_body()}
                </TableBody>
            </Table>
            
        </div>
    )
}