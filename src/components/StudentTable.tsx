import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel, SortingState,
    useReactTable, VisibilityState
} from "@tanstack/react-table";
import { StudentColumns} from "./Columns.tsx";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {StudentData} from "../interfaces/StudentInterface.ts";
import * as React from "react";
import {Input} from "./ui/input.tsx";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "./ui/dropdown-menu.tsx";
import {Button} from "./ui/button.tsx";
import {BanIcon, ChevronDown, CircleCheck, List, Loader} from "lucide-react";
import {useStudentModal} from "../hooks/useStudentModal.tsx";
import StudentForm from "./StudentForm.tsx";
import {useDeleteStudent} from "../hooks/useDeleteStudent.tsx";



interface StudentTableProps {
    data: StudentData[]
    reload:()=>void
    tableMode:"VIEW" | "MANAGE"
}



const RecentMemberTable = ({data,tableMode,reload}: StudentTableProps) => {


   const {
       HandleEditStudent,
       open:OpenEditModal,
       modalType:EditStudentModalType,
       CloseModal: CloseEditStudentModal,
       EditData : EditStudentData,
       HandleViewStudent: HandleViewStudentModal
   } =useStudentModal()
    const [sorting, setSorting] = React.useState<SortingState>([])

    const {PermanentlyDeleteStudent}=useDeleteStudent(reload)
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        actions: tableMode !== "VIEW",
        LRN:false,
        schooladdress:false
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns: StudentColumns({
            HandleEditStudent,
            HandleViewStudentModal,
            PermanentlyDeleteStudent
        }),
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
        },
        {
            value: "Stopped",
            key: "Stopped",
            id: 2,
            icon: <BanIcon size={16} className=" text-red-500"/>
        }



    ]

    return (
        <div className="">



            <StudentForm
                modalType={EditStudentModalType}
                reload={reload}
                EditData={EditStudentData}
                HandleOpenStudentModal={CloseEditStudentModal}
                openStudentModal={OpenEditModal}/>


            <div className="flex flex-row place-items-end  justify-end pb-4 gap-2">
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
            <div className=" rounded-md pt-3 border-[1px] border-black/25 py-3 px-5">
                <Table >
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
                                    colSpan={9}
                                    className="h-24 text-center CircularFont"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default RecentMemberTable;