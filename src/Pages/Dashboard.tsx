
// import {useFetchMembers} from "../hooks/useFetchMembers.ts";
import Widgets from "../components/Widgets.tsx";
import RecentMemberTable from "../components/RecentMemberTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";
// import RecentMemberTable from "../components/RecentMemberTable.tsx";


function Dashboard() {
    const {RecentMemberData} = useFetchMembers()
    return (
        <>
            <div className="flex flex-1 flex-col p-8 pt-0">
                <Widgets/>
                <div className="min-h-[100vh] flex-1 rounded-xl pt-8  md:min-h-min">
                    <p className="text-lg leading-4 CircularFont">
                        Recent Member
                    </p>
                    <p className="text-sm text-muted-foreground pb-3">
                        A list of our most recently joined members, including undergraduate and graduate students
                        actively participating in the community.
                    </p>
                    <RecentMemberTable data={RecentMemberData}/>
                </div>
            </div>
        </>


    );
}

export default Dashboard;