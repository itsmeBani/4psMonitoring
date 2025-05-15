import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ArchiveIcon,
    ArrowUpDown,
    ChevronDown,
    CircleCheck,
    List,
    Loader,
    MoreHorizontal,
    PenBox, Trash,
    User2
} from "lucide-react"

import {Button} from "./ui/button.tsx"
import {Checkbox} from "./ui/checkbox.tsx"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx"
import {Input} from "./ui/input.tsx"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table.tsx"
import {MemberData} from "../interfaces/Memberinterface.ts";

import EducationalStatus from "./EducationalStatus.tsx";
import supabase from "../supabase-config/supabase.tsx";


interface ColumnsProps {
    onArchiveMember: (id: string) => void;
    mode: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const columns = ({onArchiveMember, mode}: ColumnsProps): ColumnDef<MemberData>[] => [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox className="border-black"
                      checked={
                          table.getIsAllPageRowsSelected() ||
                          (table.getIsSomePageRowsSelected() && "indeterminate")
                      }
                      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                      aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                className="border-black"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {

        accessorKey: "firstname",
        header: () => <div className="">Student Name</div>,
        cell: ({row}) => {
            const first = row.original.firstname;
            const last = row.original.lastname;

            return <div className=" font-normal ">{first} {last}</div>
        },
    },

    {
        accessorKey: "address",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Address
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("address")}</div>,
    },

    {
        accessorKey: "school",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    School
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("school")}</div>,
    },
    {
        accessorKey: "contact",
        header: () => <div className="">Contact Number</div>,
        cell: ({row}) => {


            return <div className=" font-medium">{row.getValue("contact")}</div>
        },
    },
    {

        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="capitalize  flex">
                <EducationalStatus status={row.getValue("status")}/>

            </div>
        ),

    },
    {
        id: "actions",
        header: "Action",
        enableHiding: false,
        cell: ({row}) => {


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {mode === "Archived" ?
                            <>
                                <DropdownMenuItem><PenBox/> Edit Information</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem><User2/>View Member</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onArchiveMember(row.original.user_id)}
                                                  variant={"destructive"}><ArchiveIcon/>Archive</DropdownMenuItem>

                            </> : <>
                                <DropdownMenuItem variant={"default"}><ArchiveIcon/>Unarchived</DropdownMenuItem>
                                <DropdownMenuItem variant={"destructive"}><Trash/>Delete </DropdownMenuItem>

                            </>


                        }


                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },

    },

]


const filterOptions = [

    {
        value: "",
        key: "Show All",
        id: 3,
        icon: <List size={16}/>

    },
    {
        value: "Graduated",
        key: "Graduated",
        id: 1,
        icon: <CircleCheck size={16} className=" text-green-500"/>

    },
    {
        value: "Undergraduate",
        key: "Undergraduate",
        id: 2,
        icon: <Loader size={16}/>
    }]

interface DatatableProps {
    data: MemberData[]
    reload: () => void
    mode: "Archived" | "Unarchived"
}

export function MemberTable({data, reload, mode}: DatatableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const ArchiveMember = async (id: string): Promise<void> => {
        if (!id) return
        const {data} = await supabase
            .from('member')
            .delete()
            .eq('user_id', id)
            .select()
        if (data) {
            reload()
        }
    }


    const table = useReactTable({
        data,
        columns: columns({onArchiveMember: ArchiveMember, mode: mode}),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    const getSelectedRow = async () => {
        const RowSelected = table.getSelectedRowModel().rows;
        const selectedId = [];
        for (let index = 0; index <= RowSelected.length - 1; index++) {
            selectedId.push(RowSelected[index]?.original?.user_id)
        }
        return selectedId
    }


    const BatchArchived = async () => {
        const Ids = await getSelectedRow()
        const {error} = await supabase
            .from('member')
            .delete()
            .in('user_id', Ids)
    if (!error){
       reload()
    }

    }
const BatchUnarchive=()=>{

}

    console.log(table.getSelectedRowModel().rows)
    return (
        <div className="w-full flex flex-col gap-4">

            <div className=" flex flex-row gap-2  justify-between w-full   ">
               <div>
                   {
                       table.getSelectedRowModel().rows.length > 0 &&
                      <div className="flex gap-2 place-items-center">

                          <Button variant={"outline"} className="bg-unset hover:text-white text-red-600 hover:bg-red-500 shadow-none" onClick={mode === "Archived" ? BatchArchived : BatchUnarchive}>
                              <ArchiveIcon /></Button>
                          <p className="CircularFont text-[12px]">{mode === "Archived" ? "Archive" : "Unarchive"}  {table.getSelectedRowModel().rows.length} records</p>
                      </div>

                   }
                </div>
             <div className="flex flex-row gap-2" >
                 <Input
                     placeholder="Filter Names..."
                     value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
                     onChange={(event) =>
                         table.getColumn("firstname")?.setFilterValue(event.target.value)
                     }
                     className="w-[300px] border-black/40"
                 />
                 <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                         <Button variant="outline" className=" CircularFont text-black/80 border-black/40">
                             Columns <ChevronDown/>
                         </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="CircularFont">
                         {table
                             .getAllColumns()
                             .filter((column) => column.getCanHide())
                             .map((column) => {
                                 return (
                                     <DropdownMenuCheckboxItem
                                         key={column.id}
                                         className="capitalize"
                                         checked={column.getIsVisible()}
                                         onCheckedChange={(value) =>
                                             column.toggleVisibility(!!value)
                                         }
                                     >
                                         {column.id}
                                     </DropdownMenuCheckboxItem>
                                 )
                             })}
                     </DropdownMenuContent>
                 </DropdownMenu>
                 <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                         <Button variant="outline" className=" CircularFont text-black/80 border-black/40">
                             Status <ChevronDown/>
                         </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="CircularFont flex flex-col gap-1 p-2">

                         {filterOptions.map((option) => {
                             return (
                                 <DropdownMenuCheckboxItem key={option.key}
                                                           onClick={() => table.getColumn("status")?.setFilterValue(option.value)}
                                                           className={"p-0"}>
                                     <div
                                         className="flex w-full p-1 rounded-md border-[1px] text-gray-500 gap-1 text-[12px] border-gray-400">
                                         {option.icon}{option.key}
                                     </div>
                                 </DropdownMenuCheckboxItem>
                             )
                         })}

                     </DropdownMenuContent>
                 </DropdownMenu>
             </div>
            </div>
            <div className="rounded-md border-[1px] border-black/25 py-3 px-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className={"border-black/30"} key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className={"CircularFont  text-gray-500"} key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow className={"border-black/30 bg-white"}
                                          key={row.id}
                                          data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className=" CircularFont text-black/70 font-thin" key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-24 text-center CircularFont"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm CircularFont text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        className="CircularFont"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        className="CircularFont"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
