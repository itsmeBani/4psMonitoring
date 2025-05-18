import {useState} from 'react';
import supabase from "../supabase-config/supabase.tsx";
import {Row} from "@tanstack/react-table";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {useGetRowSelected} from "./usegetRowSelected.tsx";
import {toast} from "sonner";


const useDeleteMember = (OnsuccessReload:()=>void) => {
    const [loading,setLoading]=useState<boolean>(false)
    const {getSelectedRow}=useGetRowSelected()
    const BatchDelete = async (getSelectedRowModel :Row<MemberData>[]) => {
        setLoading(true)
        const {selectedId} = await getSelectedRow(getSelectedRowModel)
        const response = await supabase
            .from('archived_member')
            .delete()
            .in('user_id', selectedId)
        if (!response.error) {
            toast.error('Deleted Successfully!');
            OnsuccessReload()
            setLoading(false)
        }else {
            toast.error("Something wen Wrong")
        }
    }

    const PermanentlyDelete = async (id: string): Promise<void> => {
    setLoading(true)
        const {error} = await supabase
            .from('archived_member')
            .delete()
            .eq('user_id', id)
        if (!error) {
            toast.error('Deleted Successfully!');
            OnsuccessReload()

            setLoading(false)

        }else {
            toast.error("Something wen Wrong")
        }
    }

    return {loading,BatchDelete,PermanentlyDelete}
};

export default useDeleteMember;