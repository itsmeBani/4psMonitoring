import {useState} from "react";
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {useGetRowSelected} from "./usegetRowSelected.tsx";
import {Row} from "@tanstack/react-table";
import {toast} from "sonner";
type useArchivedMemberProps = ()=>void

 const useArchivedMember = (OnsuccessReload:useArchivedMemberProps) => {
    const [loading,setLoading]=useState<boolean>(false)

     const {getSelectedRow}=useGetRowSelected()
    const ArchiveMember = async (id: string): Promise<void> => {
        setLoading(true)
        if (!id) return
        const {data,error} = await supabase
            .from('member')
            .delete()
            .eq('user_id', id)

        if (error){

            toast.error('Something went Wrong');
        }
        if (!data) {
            OnsuccessReload()
            toast.success('Archived Successfully!');

        }
    }

     const Unarchived = async (memberdata: MemberData) => {
         const {error: ErrorAdding} = await supabase
             .from('member')
             .insert({
                 lastname: memberdata?.lastname,
                 firstname: memberdata?.firstname,
                 address: memberdata?.address,
                 birthdate: memberdata?.birthdate,
                 contact: memberdata?.contact,
                 school: memberdata?.school,
                 status: memberdata?.status,
             })

         if (ErrorAdding) return
         const {error: ErrorfDeleting} = await supabase
             .from('archived_member')
             .delete()
             .eq('user_id', memberdata?.user_id)

         if (ErrorfDeleting) return
             OnsuccessReload()
         toast.success('Unarchived Successfully!');
     }
     const BatchArchived = async (getSelectedRowModel :Row<MemberData>[]) => {
         const {selectedId} = await getSelectedRow(getSelectedRowModel)
         const {error} = await supabase
             .from('member')
             .delete()
             .in('user_id', selectedId)
         if (!error) {
             OnsuccessReload()
             toast.success('Unarchived Successfully!');
         }else {
             toast.error('Unarchived Successfully!');
         }

     }

    return {ArchiveMember,loading,Unarchived,BatchArchived}


};

export default useArchivedMember;