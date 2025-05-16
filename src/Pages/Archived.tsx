import {MemberTable} from "../components/DataTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";


function Archived() {
    const {archivedMember,reloadArchived}=useFetchMembers()
    return (
        <div className="px-10">

            <MemberTable mode={"Unarchived"}   reload={reloadArchived} data={archivedMember}/>
        </div>
    );
}

export default Archived;