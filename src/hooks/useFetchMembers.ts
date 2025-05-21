import {useEffect, useState} from "react";
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {StudentData} from "../interfaces/StudentInterface.ts";
import {toast} from "sonner";









interface Count {
    Undergraduate:number
    Graduated:number
    Inactive:number
    Total : number
}

export const useFetchMembers = () => {
const [memberData,setMemberData]=useState<MemberData[]>([])
const [RecentMemberData,setRecentMemberData]=useState<MemberData[]>([])
const [archivedMember,setArchivedMember]=useState<MemberData[]>([])
const [totalQuantity,setTotalQuantity]=useState<Count>()
    const [fetchStudentMemberData,setFetchStudentMemberData]=useState<StudentData[]>([])
    const fetchMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('Member')
            .select(`*, Student(count)`)
            .eq('isArchived', false)
                if (error) return
             setMemberData(data)
    }

    const fetchStudentMember=async (ParentID:string) :Promise<void>=>{
    if (!ParentID) return
        const { data, error } = await supabase
            .from('Student')
            .select()
            .eq('parent_id', ParentID)
        if (error){
            toast.error("Something went Wrong")
            return
        }
        if (data){
            setFetchStudentMemberData(data)
        }

    }



    const fetchRecentMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('Member')
            .select(`*, Student(count)`)
            .order('created_at', { ascending: false })
            .limit(8)
        if (error) return

        setRecentMemberData(data)
    }
    const fetchArchivedMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('Member')
            .select(`*, Student(count)`)
            .eq('isArchived', true)
        if (error) return
        setArchivedMember(data)
    }

    const Count :(status: string) => Promise<number | null>   =async (status:string) => {
        const { count, error } = await supabase
            .from('Student')
            .select('*', { count: 'exact', head: true })
            .eq('status', status);
        if (error) return 0
        return  count
    };
    const CountGrantee : ()=>Promise<number |null>  =async () => {
        const { count, error } = await supabase
            .from('Member')
            .select('*', { count: 'exact', head: true })
        if (error) return 0
        return  count
    };


const CountQuantityPerStatus: ()=>void =async () =>{
    const [UNDERGRADUATECOUNT, GRADUATED, INACTIVE,TOTAL] = await Promise.all([
        Count("Undergraduate"),
        Count("Graduated"),
        Count("Stopped"),
        CountGrantee()
    ]);

    setTotalQuantity({
        Undergraduate: UNDERGRADUATECOUNT ?? 0,
        Graduated: GRADUATED ?? 0,
        Inactive: INACTIVE ?? 0,
        Total: TOTAL?? 0,
    });
}



    useEffect(() => {
        fetchMembers()
        fetchRecentMembers()
        CountQuantityPerStatus()
        fetchArchivedMembers()

    }, []);


    return {reload:fetchMembers,
        reloadArchived:fetchArchivedMembers,
        memberData,
        RecentMemberData,
        totalQuantity,
        fetchArchivedMembers,
        archivedMember,
        fetchStudentMember,
        fetchStudentMemberData

    }

}