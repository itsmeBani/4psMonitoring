import {ColumnDef} from "@tanstack/react-table";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {Checkbox} from "./ui/checkbox.tsx";
import {Button} from "./ui/button.tsx";
import {ArchiveIcon, ArrowUpDown, MoreHorizontal, PenBox, Trash, User2} from "lucide-react";
import EducationalStatus from "./EducationalStatus.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu.tsx";
interface ColumnsProps {
    onArchiveMember: (id: string) => void;
    mode: string
    HandleEditMember: (memberdata: MemberData) => void
    HandleViewMember: (memberdata: MemberData) => void
    PermanentlyDelete: (id: string) => void
    Unarchived: (memberdata: MemberData) => void
}

export const columns = ({
                            onArchiveMember,
                            mode,
                            HandleEditMember,
                            HandleViewMember,
                            PermanentlyDelete,
                            Unarchived
                        }: ColumnsProps): ColumnDef<MemberData>[] => [
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
                                <DropdownMenuItem onClick={() => HandleEditMember(row?.original)}><PenBox/> Edit
                                    Information</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={() => HandleViewMember(row?.original)}><User2/>View
                                    Member</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onArchiveMember(row.original.user_id)}
                                                  variant={"destructive"}><ArchiveIcon/>Archive</DropdownMenuItem>

                            </> : <>
                                <DropdownMenuItem onClick={() => Unarchived(row?.original)}
                                                  variant={"default"}><ArchiveIcon/>Unarchived</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => PermanentlyDelete(row.original.user_id)}
                                                  variant={"destructive"}><Trash/>Delete </DropdownMenuItem>

                            </>


                        }


                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },

    },

]



export const RecentColumns = (): ColumnDef<MemberData>[] => [
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

        accessorKey: "date_created",
        header: "Date Joined",
        cell: ({row}) => (
            <div className="capitalize  flex">
                 <div className=" font-medium">

                     {new Date(row.getValue("date_created")).toLocaleString('en-US', {
                         year: 'numeric',
                         month: 'long',
                         day: 'numeric',
                         hour: 'numeric',
                         minute: 'numeric',
                         hour12: true,
                     })}

                 </div>

            </div>
        ),

    },
]