import {useEffect, useState} from "react";
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";








interface countProps {
    undergradCount:number
    gradCount:number
}
export const useFetchMembers = () => {
const [memberData,setMemberData]=useState<MemberData[]>([])
const [archivedMember,setArchivedMember]=useState<MemberData[]>([])
    const [totalMember, setTotalMember] = useState<countProps>({
        undergradCount: 0,
        gradCount: 0,
    });
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

        setArchivedMember(data)
    }

    const CountGraduated:()=>void = async (): Promise<void> => {
        const { count: undergradCount, error: undergradError } = await supabase
            .from('member')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Undergraduate');
        const { count: gradCount, error: gradError } = await supabase
            .from('member')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Graduate');

        if (undergradError || gradError) {
            console.error('Error counting:', undergradError || gradError);
            return;
        }

        setTotalMember({
            undergradCount: undergradCount || 0,
            gradCount: gradCount || 0,
        });
    };



    useEffect(() => {
        fetchMembers()
        fetchArchivedMembers()
        CountGraduated()
    }, []);


    return {reload:fetchMembers,reloadArchived:fetchArchivedMembers,memberData,fetchArchivedMembers,archivedMember,totalMember}

}