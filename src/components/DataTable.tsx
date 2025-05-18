import * as React from "react"
import {useState} from "react"
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArchiveIcon, BanIcon, ChevronDown, CircleCheck, List, Loader, Trash} from "lucide-react"

import {Button} from "./ui/button.tsx"
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "./ui/dropdown-menu.tsx"
import {Input} from "./ui/input.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./ui/table.tsx"
import {MemberData} from "../interfaces/Memberinterface.ts";

import {FormMember} from "./FormMember.tsx";
import useArchivedMember from "../hooks/useArchivedMember.tsx";

import useDeleteMember from "../hooks/useDeleteMember.tsx";
import {columns} from "./Columns.tsx";




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

interface DatatableProps {
    data: MemberData[]
    reload: () => void
    mode: "Archived" | "Unarchived"
}


type ModalType = "INSERT" | "UPDATE" | "VIEW"

export function MemberTable({data, reload, mode}: DatatableProps) {

    const OnSuccessReload= ()=> {
        reload()
        table.resetRowSelection()
    }
    const {ArchiveMember, Unarchived,BatchArchived}=useArchivedMember(OnSuccessReload)
    const {BatchDelete, PermanentlyDelete}=useDeleteMember(OnSuccessReload)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [EditedData, setEditedData] = useState<MemberData | undefined>()
    const [modaltype, setModalType] = useState<ModalType | undefined>()
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const HandleEditMember = (memberData: MemberData) => {
        setModalType("UPDATE")
        setEditedData(memberData)
        setOpenModal(true)
    }

    const HandleViewMember = (memberData: MemberData) => {
        setModalType("VIEW")
        setEditedData(memberData)
        setOpenModal(true)
    }
    const HandleInsertModal = () => {
        setModalType("INSERT")
        setOpenModal(true)

    }
    const CloseModal = () => {
        setOpenModal(false)
    }

    const table = useReactTable({
        data,
        columns: columns({
            onArchiveMember: ArchiveMember,
            mode: mode,
            HandleEditMember,
            HandleViewMember,
            PermanentlyDelete,
            Unarchived
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





    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex place-items-end w-full justify-end ">
                <FormMember
                    mode={mode}
                    open={OpenModal}
                    EditedData={EditedData}
                    modaltype={modaltype}
                    CloseModal={CloseModal}
                    HandleInsertModal={HandleInsertModal}
                    reload={reload}/>
            </div>
            <div className=" flex flex-row gap-2  justify-between w-full   ">
                <div>
                    {
                        table.getSelectedRowModel().rows.length > 0 &&
                        <div className="flex gap-2 place-items-center">

                            <Button variant={"outline"}
                                    className="bg-unset hover:text-white text-red-600 hover:bg-red-500 shadow-none"
                                    onClick={()=>
                                        mode === "Archived" ? BatchArchived(table.getSelectedRowModel().rows) : BatchDelete(table.getSelectedRowModel().rows)
                                    }>

                                {mode === "Archived" ?     <ArchiveIcon/> : <Trash/>}

                            </Button>
                            <p className="CircularFont text-[12px]">Selected  {table.getSelectedRowModel().rows.length} records</p>
                        </div>

                    }
                </div>
                <div className="flex flex-row gap-2">
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
