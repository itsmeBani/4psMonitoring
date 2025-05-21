import * as React from "react"
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
import {ArchiveIcon, ArchiveRestoreIcon, ChevronDown} from "lucide-react"

import {Button} from "./ui/button.tsx"
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "./ui/dropdown-menu.tsx"
import {Input} from "./ui/input.tsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./ui/table.tsx"
import {MemberData} from "../interfaces/Memberinterface.ts";

import {FormMember} from "./FormMember.tsx";
import useArchivedMember from "../hooks/useArchivedMember.tsx";

import useDeleteMember from "../hooks/useDeleteMember.tsx";
import {columns} from "./Columns.tsx";
import StudentForm from "./StudentForm.tsx";
import {useMemberModal} from "../hooks/useMemberModal.tsx";
import ViewStudent from "./ViewStudent.tsx";
import {useStudentModal} from "../hooks/useStudentModal.tsx";
interface DatatableProps {
    data: MemberData[]
    reload: () => void
    mode: "Archived" | "Unarchived"
}


export function MemberTable({data, reload, mode}: DatatableProps) {

    const OnSuccessReload = () => {
        reload()
        table.resetRowSelection()
    }
    const {BatchArchived    ,handleArchiveToggle} = useArchivedMember(OnSuccessReload)
    const {PermanentlyDelete} = useDeleteMember(OnSuccessReload)


    const {
        open: openStudentModal,
        HandleOpenModal: HandleOpenStudentModal,
        selectedParentID,
    } = useMemberModal()


    const {
        open: OpenFormMember,
        CloseModal: CloseMemberModal,
        HandleView: HandleViewMember,
        HandleInsert: HandleInsertModal,
        HandleUpdate: HandleEditMember,
        data: FormMemberData,
        mode: FormMemberModalType

    } = useMemberModal()

    const {
        open : OpenStudentModal,
        HandleOpenStudentModal : HandleOpenViewStudent,
        CloseModal : CloseViewStudentModal,
        selectedViewParentID :ViewParentID
    }=useStudentModal()





    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})


    const table = useReactTable({
        data,
        columns: columns({
            handleArchiveToggle,
            mode: mode,
            HandleEditMember,
            HandleOpenViewStudent,
            HandleViewMember,
            HandleOpenStudentModal,
            PermanentlyDelete,
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
                    open={OpenFormMember}
                    EditedData={FormMemberData}
                    modaltype={FormMemberModalType}
                    CloseModal={CloseMemberModal}
                    HandleInsertModal={HandleInsertModal}
                    reload={reload}/>

                <StudentForm
                    modalType={"INSERT"}
                    reload={reload}
                    ParentID={selectedParentID}
                    HandleOpenStudentModal={HandleOpenStudentModal}
                    openStudentModal={openStudentModal}/>


                <ViewStudent
                    ParentID={ViewParentID}
                    CloseViewStudentModal={CloseViewStudentModal}
                    OpenStudentModal={OpenStudentModal}/>


            </div>
            <div className=" flex flex-row gap-2  justify-between w-full   ">
                <div>
                    {
                        table.getSelectedRowModel().rows.length > 0 &&
                        <div className="flex gap-2 place-items-center">

                            <Button variant={"outline"}
                                    className="bg-unset shadow-none"
                                    onClick={() =>
                                        mode === "Archived" ? BatchArchived(table.getSelectedRowModel().rows,true) : BatchArchived(table.getSelectedRowModel().rows,false)
                                    }>

                                {mode === "Archived" ? <ArchiveIcon/> : <ArchiveRestoreIcon />}

                            </Button>
                            <p className="CircularFont text-[12px]"> {mode === "Archived" ? "Archive" : "Unarchived"} {table.getSelectedRowModel().rows.length} records</p>
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
                    {/*<DropdownMenu>*/}
                    {/*    <DropdownMenuTrigger asChild>*/}
                    {/*        <Button variant="outline" className=" CircularFont text-black/80 border-black/40">*/}
                    {/*            Status <ChevronDown/>*/}
                    {/*        </Button>*/}
                    {/*    </DropdownMenuTrigger>*/}
                    {/*    <DropdownMenuContent className="CircularFont flex flex-col gap-1 p-2">*/}

                    {/*        {filterOptions.map((option) => {*/}
                    {/*            return (*/}
                    {/*                <DropdownMenuCheckboxItem key={option.key}*/}
                    {/*                                          onClick={() => table.getColumn("status")?.setFilterValue(option.value)}*/}
                    {/*                                          className={"p-0"}>*/}
                    {/*                    <div*/}
                    {/*                        className="flex w-full p-1 rounded-md border-[1px] text-gray-500 gap-1 text-[12px] border-gray-400">*/}
                    {/*                        {option.icon}{option.key}*/}
                    {/*                    </div>*/}
                    {/*                </DropdownMenuCheckboxItem>*/}
                    {/*            )*/}
                    {/*        })}*/}

                    {/*    </DropdownMenuContent>*/}
                    {/*</DropdownMenu>*/}
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
