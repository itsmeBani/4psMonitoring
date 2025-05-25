import {Document, Page, PDFViewer, StyleSheet, View, Image, Text} from "@react-pdf/renderer";
import {
    Table,
    TableCell,

    TableHeader,
    TableRow, TD,
} from "@ag-media/react-pdf-table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog.tsx";
import {PrinterIcon, XIcon} from "lucide-react";
import {StudentData} from "../interfaces/StudentInterface.ts";
import {useFetchStudents} from "../hooks/useFetchStudents.tsx";
import Logo4ps from  "../assets/4ps-logo.jpg"
import DSWDLOGO from  "../assets/dswdlogo.png"
import DEPEDLOGO from  "../assets/depedlogo.png"
import {Button} from "./ui/button.tsx";
// Sample 10 records
// const data: StudentData[] = [
//     {
//         student_id: "S001",
//         parent_id: "P001",
//         firstname: "Juan",
//         lastname: "Dela Cruz",
//         middlename: "Santos",
//         birthdate: "2005-04-12",
//         LRN: "1234567890",
//         gradelevel: "Grade 10",
//         schoolname: "Central High School",
//         schooladdress: "123 Main St",
//         schoolID: "SCH001",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2020-06-01",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S002",
//         parent_id: "P002",
//         firstname: "Maria",
//         lastname: "Reyes",
//         middlename: "Lopez",
//         birthdate: "2004-09-20",
//         LRN: "0987654321",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S003",
//         parent_id: "P003",
//         firstname: "Pedro",
//         lastname: "Garcia",
//         middlename: "Diaz",
//         birthdate: "2006-02-28",
//         LRN: "1122334455",
//         gradelevel: "Grade 9",
//         schoolname: "Eastview School",
//         schooladdress: "789 East Blvd",
//         schoolID: "SCH003",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2021-01-15",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S004",
//         parent_id: "P004",
//         firstname: "Ana",
//         lastname: "Cruz",
//         middlename: "Lopez",
//         birthdate: "2003-12-05",
//         LRN: "5566778899",
//         gradelevel: "Grade 12",
//         schoolname: "Northside High",
//         schooladdress: "101 North St",
//         schoolID: "SCH004",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2018-08-22",
//         status: "Graduated",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S005",
//         parent_id: "P005",
//         firstname: "Luis",
//         lastname: "Mendoza",
//         middlename: "Reyes",
//         birthdate: "2005-07-18",
//         LRN: "6677889900",
//         gradelevel: "Grade 10",
//         schoolname: "Central High School",
//         schooladdress: "123 Main St",
//         schoolID: "SCH001",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2020-06-01",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S006",
//         parent_id: "P006",
//         firstname: "Cathy",
//         lastname: "Villanueva",
//         middlename: "Garcia",
//         birthdate: "2004-11-25",
//         LRN: "9988776655",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S007",
//         parent_id: "P007",
//         firstname: "Mark",
//         lastname: "Lopez",
//         middlename: "Santos",
//         birthdate: "2006-05-10",
//         LRN: "4455667788",
//         gradelevel: "Grade 9",
//         schoolname: "Eastview School",
//         schooladdress: "789 East Blvd",
//         schoolID: "SCH003",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2021-01-15",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S008",
//         parent_id: "P008",
//         firstname: "Ella",
//         lastname: "Torres",
//         middlename: "Diaz",
//         birthdate: "2003-03-17",
//         LRN: "3344556677",
//         gradelevel: "Grade 12",
//         schoolname: "Northside High",
//         schooladdress: "101 North St",
//         schoolID: "SCH004",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2018-08-22",
//         status: "Graduated",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S009",
//         parent_id: "P009",
//         firstname: "John",
//         lastname: "Reyes",
//         middlename: "Mendoza",
//         birthdate: "2005-10-30",
//         LRN: "2233445566",
//         gradelevel: "Grade 10",
//         schoolname: "Central High School",
//         schooladdress: "123 Main St",
//         schoolID: "SCH001",
//         schooltype: "Public",
//         schoollevel: "Secondary",
//         created_at: "2020-06-01",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     }, {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Academy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//     {
//         student_id: "S010",
//         parent_id: "P010",
//         firstname: "Grace",
//         lastname: "Santos",
//         middlename: "Lopez",
//         birthdate: "2004-08-22",
//         LRN: "7788990011",
//         gradelevel: "Grade 11",
//         schoolname: "Westside Aeeeeeeeeeecade eeeeee eeeeeeeee eeeeeemy",
//         schooladdress: "456 West St",
//         schoolID: "SCH002",
//         schooltype: "Private",
//         schoollevel: "Secondary",
//         created_at: "2019-07-10",
//         status: "Undergraduate",
//         schoolyearstart: "2023",
//         schoolyearend: "2024",
//     },
//
// ];

// Styles
const styles = StyleSheet.create({
    page: {
        padding: 15,
        fontSize: 8,
    },
    tableHeader: {
        backgroundColor: "#e0e0e0",

    },
    cell: {
        padding: 4,
        fontSize: 7,
        width: 100
    },

    viewer: {
        width: "100%",
        height: "80dvh",
    },
    headerLogoContainer : {
        width : "100%",


        marginBottom:20,
        gap:20,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    headerLogo:{
        width:50,
        height:50
    },
    headerTextContainer:{
        display : "flex",
        flexDirection : "column",
       alignItems:"center",
        gap:3,

    },headerTextStyle:{
        textAlign:"center",
   fontWeight:"medium",
        textTransform:"uppercase",
        fontSize:10,
    }

});

interface TablePreviewProps {
    data: StudentData[]
}

const TablePreview = ({data}: TablePreviewProps) => {
    function chunkArray(array: StudentData[], chunkSize: number) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const rowsPerPage = 15; // adjust as needed (how many rows per page)
    const dataChunks = chunkArray(data, rowsPerPage);
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                {dataChunks?.map((chunk: StudentData[],) => (
                    <Page size="A4" orientation="landscape" style={styles.page}>
                    <View style={styles.headerLogoContainer}>

                        <Image
                            style={styles.headerLogo}
                            src={DSWDLOGO}
                        />
                        <View style={styles.headerTextContainer}>
                            <Image
                                style={styles.headerLogo}
                                src={DEPEDLOGO}
                            />
                            <Text style={styles.headerTextStyle}>Pantawid Pamilyang Pilipino Program</Text>
                            <Text style={[styles.headerTextStyle,{fontWeight:"extrabold"}]}>Student List</Text>




                        </View>
                        <Image
                            style={styles.headerLogo}
                            src={Logo4ps}
                        />

                    </View>

                        <Table>
                            <TableHeader>


                                <TD style={styles.cell}>Student Name</TD>
                                <TD style={styles.cell}>Birthdate</TD>
                                <TD style={styles.cell}>LRN</TD>
                                <TD style={styles.cell}>Grade Level</TD>
                                <TD style={styles.cell}>School Name</TD>
                                <TD style={styles.cell}>School Address</TD>
                                <TD style={styles.cell}>School ID</TD>
                                <TD style={styles.cell}>School Type</TD>
                                <TD style={styles.cell}>School Level</TD>
                                <TD style={styles.cell}>Status</TD>
                                <TD style={styles.cell}>School Year</TD>
                            </TableHeader>


                            {chunk?.map((row: StudentData, i: number) => {
                                const name = row.firstname + " " + row.middlename + " " + row.lastname
                                return (
                                    <TableRow key={i}>
                                        <TableCell style={styles.cell}>{name}</TableCell>
                                        <TableCell style={styles.cell}>
                                            {new Date(row.birthdate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</TableCell>
                                        <TableCell style={styles.cell}>{row.LRN}</TableCell>
                                        <TableCell style={styles.cell}>{row.gradelevel}</TableCell>
                                        <TableCell style={styles.cell}>{row.schoolname}</TableCell>
                                        <TableCell style={styles.cell}>{row.schooladdress}</TableCell>
                                        <TableCell style={styles.cell}>{row.schoolID}</TableCell>
                                        <TableCell style={styles.cell}>{row.schooltype}</TableCell>
                                        <TableCell style={styles.cell}>{row.schoollevel}</TableCell>
                                        <TableCell style={styles.cell}>{row.status}</TableCell>
                                        <TableCell
                                            style={styles.cell}>{row.schoolyearstart}-{row.schoolyearend}</TableCell>
                                    </TableRow>

                                )


                            })}


                        </Table>

                    </Page>
                ))}
            </Document>
        </PDFViewer>
    )
}


export const RenderPrintPdf = () => {
    const {studentData} = useFetchStudents()
    return (
        <Dialog>
            <DialogTrigger><Button variant={"outline"}><PrinterIcon className="text-md"/></Button></DialogTrigger>
            <DialogContent className="sm:max-w-8xl">
                <DialogClose
                    className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <XIcon/>
                    <span className="sr-only">Close</span>

                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Print Preview</DialogTitle>
                    <DialogDescription>
                        Review the table below before printing. Make sure all data is correct and complete.
                    </DialogDescription>

                    {studentData.length > 0 ? <TablePreview data={studentData}/> : <p className="text-center">No record found</p>}
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}