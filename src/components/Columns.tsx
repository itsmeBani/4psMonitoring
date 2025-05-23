import {ColumnDef} from "@tanstack/react-table";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {Checkbox} from "./ui/checkbox.tsx";
import {Button} from "./ui/button.tsx";
import {
    ArchiveIcon,
    ArrowUpDown,
    MoreHorizontal,
    PenBox,
    PlusIcon,
    Trash,
    User2,
    Users, UserSquare
} from "lucide-react";
import EducationalStatus from "./EducationalStatus.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu.tsx";
import {StudentData} from "../interfaces/StudentInterface.ts";
interface ColumnsProps {
    handleArchiveToggle: (id: string,shouldArchive: boolean) => void;
    mode: string
    HandleEditMember: (memberdata: MemberData) => void
    HandleViewMember: (memberdata: MemberData) => void
    PermanentlyDelete: (id: string) => void
    HandleOpenStudentModal:(id:string)=>void
    HandleOpenViewStudent:(ParentID:string)=>void

}

export const columns = ({
                            handleArchiveToggle,
                            mode,
                            HandleOpenViewStudent,
                            HandleOpenStudentModal,
                            HandleEditMember,
                            HandleViewMember,
                            PermanentlyDelete

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
        header: () => <div className="">Name of Grantee </div>,
        cell: ({row}) => {
            const first = row.original.firstname;
            const last = row.original.lastname;
            const  middle_anme = row.original.middle_name

            return <div className=" font-normal ">{first} {middle_anme} {JSON.stringify(row.original.Student[0].count)} {last}</div>
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
        accessorKey: "house_no",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    House No
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("house_no")}</div>,
    },
    {
        accessorKey: "contact",
        header: () => <div className="">Contact Number</div>,
        cell: ({row}) => {


            return <div className=" font-medium">{row.getValue("contact")}</div>
        },
    },
    {
        accessorKey: "birthdate",
        header: () => <div className="">Birth Date</div>,
        cell: ({row}) => {


            return <div className=" font-medium">


                {new Date(row.getValue("birthdate")).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
        },
    },
    {
        accessorKey: "Student",
        header: () => <div className="">Students</div>,
        cell: ({row}) => {


            return <div className=" flex gap-1"><Users size={17}/>{row.original.Student[0].count}</div>
        },
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
                                <DropdownMenuItem onClick={()=>HandleEditMember(row.original)} ><PenBox/> Edit
                                    Information</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem  onClick={()=>HandleViewMember(row.original)}><User2/>View Member</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>HandleOpenViewStudent(row.original.parent_id)}><UserSquare/>View Student</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>HandleOpenStudentModal(row.original.parent_id)} ><PlusIcon/>Add Student</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>handleArchiveToggle(row.original.parent_id,true)} variant={"destructive"}><ArchiveIcon/>Archive</DropdownMenuItem>

                            </> : <>
                                <DropdownMenuItem onClick={()=>handleArchiveToggle(row.original.parent_id,false)}
                                                  variant={"default"}><ArchiveIcon/>Unarchived</DropdownMenuItem>
                                <DropdownMenuItem  onClick={()=>PermanentlyDelete(row.original.parent_id)}
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
        header: () => <div className="">Name of Grantee</div>,
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
        accessorKey: "contact",
        header: () => <div className="">Contact Number</div>,
        cell: ({row}) => {


            return <div className=" font-medium">{row.getValue("contact")}</div>
        },
    },

    {
        accessorKey: "Student",
        header: () => <div className="">Students</div>,
        cell: ({row}) => {


            return <div className=" flex gap-1"><Users size={17}/>{row.original.Student[0].count}</div>
        },
    },
    {

        accessorKey: "created_at",
        header: "Date Joined",
        cell: ({row}) => (
            <div className="capitalize  flex">
                 <div className=" font-medium">

                     {new Date(row.getValue("created_at")).toLocaleString('en-US', {
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


interface StudentColumnsProps {
    HandleEditStudent: (StudentData:StudentData)=>void
    HandleViewStudentModal:(StudentData:StudentData)=>void
    PermanentlyDeleteStudent:(StudentID:string)=>void
}

export const StudentColumns = ({HandleEditStudent,HandleViewStudentModal,PermanentlyDeleteStudent} :StudentColumnsProps): ColumnDef<StudentData>[] => [
    {
        accessorKey: "firstname",
        header: () => <div>Student Name</div>,
        cell: ({ row }) => {
            const first = row.original.firstname;
            const last = row.original.lastname;
            const middlename = row.original.middlename;
            return <div className="font-normal">{first} {middlename} {last}</div>;
        },
    },
    {
        accessorKey: "LRN",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                LRN
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("LRN")}</div>,
    },
    {
        accessorKey: "gradelevel",
        header: () => <div>Grade Level</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("gradelevel")}</div>,
    },
    {
        accessorKey: "schoolname",
        header: () => <div>School Name</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("schoolname")}</div>,
    },
    {
        accessorKey: "schooladdress",
        header: () => <div>School Address</div>,
        cell: ({ row }) => <div className="font-medium  uppercase capitalize">{row.getValue("schooladdress")}</div>,
    },
    {
        accessorKey: "schoolID",
        header: () => <div>School Id</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("schoolID")}</div>,
    },
    {
        accessorKey: "schoolyearstart",
        header: () => <div className="">School Year</div>,
        cell: ({row}) => {


            return <div className=" font-medium">{row.getValue("schoolyearstart") + " - " + row.original.schoolyearend}</div>
        },
    },
    {
        accessorKey: "schooltype",
        header: () => <div>School Type</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("schooltype")}</div>,
    },
    {
        accessorKey: "schoollevel",
        header: () => <div>School Level</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("schoollevel")}</div>,
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize flex">
                <EducationalStatus status={row.getValue("status")} />
            </div>
        ),
    },
    {
        id: "actions",
        header: "Action",
        enableHiding: false,
        cell: ({row}) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <>
                        <DropdownMenuItem onClick={()=>HandleEditStudent(row.original)}><PenBox /> Edit Information</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>HandleViewStudentModal(row.original)}><User2 /> View Student</DropdownMenuItem>
                        <DropdownMenuItem  onClick={()=>PermanentlyDeleteStudent(row.original.student_id)}  variant={"destructive"}><Trash /> Delete</DropdownMenuItem>
                    </>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
