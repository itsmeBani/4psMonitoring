import {useEffect, useState} from "react";
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";









export const useFetchMembers = () => {
const [memberData,setMemberData]=useState<MemberData[]>([])
const [archivedMember,setArchivedMember]=useState<MemberData[]>([])
    const fetchMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('member')
            .select()

        if (error) return

        setMemberData(data)
    }

    const fetchArchivedMembers : ()=>void= async ()=>{
        const { data, error } = await supabase
            .from('archived_member')
            .select()

        if (error) return
        console.log(data)
        setArchivedMember(data)
    }
    useEffect(() => {
        fetchMembers()
        fetchArchivedMembers()
    }, []);


    return {reload:fetchMembers,memberData,fetchArchivedMembers,archivedMember}

}