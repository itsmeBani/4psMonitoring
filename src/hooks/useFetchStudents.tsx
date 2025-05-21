import supabase from "../supabase-config/supabase.tsx";
import {useEffect, useState} from "react";
import {StudentData} from "../interfaces/StudentInterface.ts";
import {toast} from "sonner";



export const useFetchStudents = ( ParentID?:string) => {
    const [studentData,setStudentData]=useState<StudentData[] >([])
    const [viewStudentData,setViewStudentData]=useState<StudentData[]>([])
    const FetchStudents : ()=>void = async (): Promise<void>=> {

        const { data, error } = await supabase
            .from('Student')
            .select()
            .order('created_at', { ascending: false })
        if (error){
            toast.error("Something Went Wrong")
        }
        if (data){
            setStudentData(data)
        }
    }


    const FetchMemberStudent : (ParentID: string)=>void= async (ParentID:string)=>{
        const { data, error } = await supabase
            .from('Student')
            .select('*')
            .eq('parent_id', ParentID);

        if (error) {
            console.error(error);
        } else {
            setViewStudentData(data)
        }

    }


    useEffect(() => {
        if (ParentID){
            FetchMemberStudent(ParentID)
        }
    }, [ParentID]);


    useEffect(() => {
        FetchStudents()
    }, []);








    return {studentData, reload: FetchStudents,viewStudentData}
};

;