import {useState} from 'react';
import supabase from "../supabase-config/supabase.tsx";

import {toast} from "sonner";

interface useDeleteStudentProps {
    loading:boolean
    PermanentlyDeleteStudent:(StudentID: string)=>void
}

export  const useDeleteStudent = (OnsuccessReload:()=>void):useDeleteStudentProps  => {
    const [loading,setLoading]=useState<boolean>(false)


    const PermanentlyDeleteStudent = async (StudentID: string): Promise<void> => {
        setLoading(true)
        const {error} = await supabase
            .from('Student')
            .delete()
            .eq('student_id', StudentID)
        if (!error) {
            toast.error('Deleted Successfully!');
            OnsuccessReload()
            setLoading(false)

        }else {
            toast.error("Something wen Wrong")
        }
    }

    return {loading,PermanentlyDeleteStudent}
};

