import {MemberTable,} from "../components/MemberTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";
import {Toaster} from "sonner";







function Members() {


const {memberData, reload}=useFetchMembers()
    return (
        <div className="px-10 flex w-full  flex-col gap-3">

           <MemberTable mode={"Archived"} reload={reload}  data={memberData}/>
            <Toaster theme={"dark"} expand={true} richColors={true} position="top-right" />

        </div>
    );
}

export default Members;