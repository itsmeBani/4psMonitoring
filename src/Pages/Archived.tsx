import {MemberTable} from "../components/MemberTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";
import {Toaster} from "sonner";


function Archived() {
    const {archivedMember,reloadArchived}=useFetchMembers()
    return (
        <div className="px-10">
             <MemberTable data={archivedMember} reload={reloadArchived} mode={"Unarchived"}/>
             <Toaster theme={"dark"} expand={true} richColors={true} position="top-right" />

        </div>
    );
}

export default Archived;