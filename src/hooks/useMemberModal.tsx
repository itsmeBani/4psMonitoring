import {useState} from 'react';
import {MemberData} from "../interfaces/Memberinterface.ts";
import {StudentData} from "../interfaces/StudentInterface.ts";

interface ModalInterface {
    HandleOpenModal: (id?: string) => void;
    open: boolean;
    selectedParentID: string;
    CloseModal: () => void;
    HandleUpdate: (MemberData: MemberData) => void;
    HandleView: (MemberData: MemberData) => void;
    HandleInsert: () => void;
    mode: "INSERT" | "UPDATE" | "VIEW" | undefined;
    data: StudentData | MemberData | undefined
}

type Mode="INSERT" | "UPDATE" | "VIEW"
export const useMemberModal: () => ModalInterface = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedParentID, setSelectedParentId] = useState<string>("")
    const [mode,setMode]=useState<Mode>()
    const [data, setData]=useState<StudentData | MemberData >()
    const HandleOpenModal = (id?: string) => {
        if (id) {
            setSelectedParentId(id)
        }
        setOpen(!open)
    }


   const HandleUpdate=(MemberData:MemberData)=>{
        setMode("UPDATE")
       setData(MemberData)
       setOpen(true)
   }
    const HandleView=(MemberData:MemberData)=>{
        setMode("VIEW")
        setData(MemberData)
        setOpen(true)
    }
    const HandleInsert=()=>{
        setMode("INSERT")
        setData(undefined)
        setOpen(true)
    }

    const CloseModal = () => {
        setOpen(false)
    }


    return {HandleOpenModal, open, selectedParentID, CloseModal,HandleUpdate,HandleView,HandleInsert,mode,data}
};
