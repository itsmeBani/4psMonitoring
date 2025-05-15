import {MemberTable} from "../components/DataTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";


function Archived() {
    const {archivedMember,reload}=useFetchMembers()
    return (
        <div className="px-10">

            <MemberTable mode={"Unarchived"}  reload={reload} data={archivedMember}/>
        </div>
    );
}

export default Archived;