
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from './ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {XIcon} from "lucide-react";
import {useFetchStudents} from "../hooks/useFetchStudents.tsx";
import StudentTable from "./StudentTable.tsx";
interface ViewStudentProps{
    OpenStudentModal:boolean
    CloseViewStudentModal:()=>void
    ParentID:string | undefined
}

function ViewStudent({OpenStudentModal,CloseViewStudentModal,ParentID} : ViewStudentProps) {

const {viewStudentData,reload}=useFetchStudents(ParentID)
    return (
        <Dialog open={OpenStudentModal}>

            <DialogContent className="sm:max-w-7xl h-[90%] flex flex-col gap-10">

                <DialogHeader className={"h-auto"}>
                    <DialogTitle>View Students</DialogTitle>
                    <DialogDescription>
                        These are the students benefiting from the 4Ps Pantawid Pamilya program
                    </DialogDescription>
                </DialogHeader>
                <DialogPrimitive.Close onClick={CloseViewStudentModal}  className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <XIcon />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>


                <StudentTable reload={reload} tableMode={"VIEW"} data={viewStudentData}/>



            </DialogContent>
        </Dialog>
    );
}

export default ViewStudent;