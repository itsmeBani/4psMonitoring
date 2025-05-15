import {MemberTable,} from "../components/DataTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";
import {Toaster} from "sonner";
import {FormMember} from "../components/FormMember.tsx";






function Members() {


const {memberData, reload}=useFetchMembers()
    return (
        <div className="px-10 flex flex-col gap-3">
            <div className="flex place-items-end w-full justify-end ">
                <FormMember reload={reload}/>
            </div>
           <MemberTable mode={"Archived"} reload={reload}  data={memberData}/>
            <Toaster theme={"dark"} richColors={true} position="top-right" />

        </div>
    );
}

export default Members;