
import supabase from "../supabase-config/supabase.tsx";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {useGetRowSelected} from "./usegetRowSelected.tsx";
import {Row} from "@tanstack/react-table";
import {toast} from "sonner";
type useArchivedMemberProps = ()=>void

 const useArchivedMember = (OnsuccessReload:useArchivedMemberProps) => {

     const {getSelectedRow}=useGetRowSelected()
     const handleArchiveToggle = async (id: string, shouldArchive: boolean): Promise<void> => {
         if (!id) return;

         const { data, error } = await supabase
             .from('Member')
             .update({ isArchived: shouldArchive })
             .eq('parent_id', id)
             .select();

         if (error) {
             console.log(error);
             toast.error('Something went wrong');
         }

         if (data) {
             OnsuccessReload();
             toast.success(shouldArchive ? 'Archived Successfully!' : 'Unarchived Successfully!');
         }
     };





     const BatchArchived = async (getSelectedRowModel :Row<MemberData>[],shouldArchive: boolean) => {
         const {selectedId} = await getSelectedRow(getSelectedRowModel)
         const { data, error } = await supabase
             .from('Member')
             .update({ isArchived: shouldArchive })
             .in('parent_id', selectedId)
             .select()
         console.log(error)
         console.log(data)
         if (error) {
             console.log(error);
             toast.error('Something went wrong');
         }

         if (data) {
             OnsuccessReload();
             toast.success(shouldArchive ? 'Archived Successfully!' : 'Unarchived Successfully!');
         }

     }

    return {BatchArchived,handleArchiveToggle}


};

export default useArchivedMember;