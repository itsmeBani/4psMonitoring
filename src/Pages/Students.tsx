import {Toaster} from "sonner";
import StudentTable from "../components/StudentTable.tsx";
import {useFetchStudents} from "../hooks/useFetchStudents.tsx";


function Students() {
const {studentData,reload}=useFetchStudents()
    return (
        <div className="px-10 overflow-hidden flex flex-col w-full gap-3">


            <StudentTable data={studentData} reload={reload} tableMode={"MANAGE"}/>
            <Toaster theme={"dark"} expand={true} richColors={true} position="top-right"/>


        </div>
    );
}

export default Students;