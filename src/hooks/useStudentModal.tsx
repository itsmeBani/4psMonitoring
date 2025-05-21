import {useState} from "react";
import {StudentData} from "../interfaces/StudentInterface.ts";


interface UseStudentModalInterface {
    open:boolean
    HandleOpenStudentModal:(ParentID:string)=>void
    CloseModal:()=>void
    selectedViewParentID:string |undefined
    modalType:"VIEW" | "INSERT" | "UPDATE" | undefined
    HandleEditStudent:(StudentData:StudentData)=>void
    EditData:StudentData | undefined
    HandleViewStudent:(StudentData:StudentData)=>void
}
 type ModalType = "VIEW" | "INSERT" | "UPDATE"
export const useStudentModal : ()=> UseStudentModalInterface  = () => {
const [open,setOpen]=useState<boolean>(false)
const [selectedViewParentID,setSelectedViewParentID]=useState<string | undefined>()
const [EditData,setEditData]=useState<StudentData>()
    const [modalType,setModalType]=useState<ModalType>()


const HandleOpenStudentModal =(ParentID:string)=>{
    setModalType("INSERT")
    setSelectedViewParentID(ParentID)
    setOpen(true)
}


const HandleEditStudent=(StudentData: StudentData)=>{
    setModalType("UPDATE")
    setEditData(StudentData)
    setOpen(true)
    console.log(StudentData)
}

    const HandleViewStudent=(StudentData: StudentData)=>{
        setModalType("VIEW")
        setEditData(StudentData)
        setOpen(true)
        console.log(StudentData)
    }


const CloseModal= ()=>{
    setSelectedViewParentID(undefined)
    setOpen(false)
}




    return {open,HandleOpenStudentModal,CloseModal,selectedViewParentID,HandleEditStudent,EditData,HandleViewStudent,modalType}
};
