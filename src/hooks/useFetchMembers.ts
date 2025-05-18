import {useEffect, useState} from "react";
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";









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
    const fetchMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('member')
            .select()
                if (error) return

        setMemberData(data)
    }

    const fetchRecentMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('member')
            .select()
            .order('date_created', { ascending: false })
            .limit(8)
        if (error) return

        setRecentMemberData(data)
    }
    const fetchArchivedMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('member')
            .select()
        if (error) return
        setArchivedMember(data)
    }

    const Count :(status: string) => Promise<number | null>   =async (status:string) => {
        const { count, error } = await supabase
            .from('member')
            .select('*', { count: 'exact', head: true })
            .eq('status', status);
        if (error) return 0
        return  count
    };



const CountQuantityPerStatus: ()=>void =async () =>{
    const [UNDERGRADUATECOUNT, GRADUATED, INACTIVE] = await Promise.all([
        Count("Undergraduate"),
        Count("Graduated"),
        Count("Stopped"),
    ]);

    setTotalQuantity({
        Undergraduate: UNDERGRADUATECOUNT ?? 0,
        Graduated: GRADUATED ?? 0,
        Inactive: INACTIVE ?? 0,
        Total: (UNDERGRADUATECOUNT ?? 0) + (GRADUATED ?? 0) + (INACTIVE ?? 0),
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

    }

}