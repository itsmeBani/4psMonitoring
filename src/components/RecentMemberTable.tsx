import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { RecentColumns} from "./Columns.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";


interface RecentMemberTableProps {
    data: MemberData[]

}
const RecentMemberTable = ({data}:RecentMemberTableProps) => {

    const table = useReactTable({
        data,
        columns:RecentColumns(),

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })
    return (
        <div>
            <div className="rounded-md pt-3 border-[1px] border-black/25 py-3 px-5">
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

        </div>
    );
};

export default RecentMemberTable;