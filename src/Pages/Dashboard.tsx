import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Badge} from "../components/ui/badge.tsx";
import {TrendingDownIcon, TrendingUpIcon} from "lucide-react";
import {MemberTable} from "../components/DataTable.tsx";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";


function Dashboard() {
    const {archivedMember,reloadArchived,totalMember}=useFetchMembers()
    return (
             <>
                 <div className="flex flex-1 flex-col p-8 pt-0">
                     <div className="grid grid-cols-3 gap-4 pb-4 ">
                         <Card className="@container/card">
                             <CardHeader className="relative">
                                 <CardDescription>Undergraduate Students</CardDescription>
                                 <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                     {totalMember?.undergradCount}
                                 </CardTitle>

                             </CardHeader>
                             <CardFooter className="flex-col items-start gap-1 text-sm">
                                 <div className="line-clamp-1 flex gap-2 font-medium">
                                     Enrollment increased <TrendingUpIcon className="size-4" />
                                 </div>
                                 <div className="text-muted-foreground">
                                     Compared to last academic year
                                 </div>
                             </CardFooter>
                         </Card>

                         <Card className="@container/card">
                             <CardHeader className="relative">
                                 <CardDescription>Graduated Students</CardDescription>
                                 <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                     {totalMember?.gradCount}
                                 </CardTitle>
                                 <div className="absolute right-4 top-4">
                                     <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                         <TrendingDownIcon className="size-3" />
                                         -3.2%
                                     </Badge>
                                 </div>
                             </CardHeader>
                             <CardFooter className="flex-col items-start gap-1 text-sm">
                                 <div className="line-clamp-1 flex gap-2 font-medium">
                                     Fewer graduates this year <TrendingDownIcon className="size-4" />
                                 </div>
                                 <div className="text-muted-foreground">
                                     Graduation rate slightly declined
                                 </div>
                             </CardFooter>
                         </Card>

                         <Card className="@container/card">
                             <CardHeader className="relative">
                                 <CardDescription>Active Members</CardDescription>
                                 <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                     {totalMember?.gradCount +  totalMember?.undergradCount}
                                 </CardTitle>
                                 <div className="absolute right-4 top-4">
                                     <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                         <TrendingUpIcon className="size-3" />
                                         +8%
                                     </Badge>
                                 </div>
                             </CardHeader>
                             <CardFooter className="flex-col items-start gap-1 text-sm">
                                 <div className="line-clamp-1 flex gap-2 font-medium">
                                     Increased engagement <TrendingUpIcon className="size-4" />
                                 </div>
                                 <div className="text-muted-foreground">
                                     Includes students
                                 </div>
                             </CardFooter>
                         </Card>

                     </div>
                     <div className="min-h-[100vh] flex-1 rounded-xl pt-8  md:min-h-min">
                         <p className="text-lg leading-4 CircularFont">
                     Recent Member
                          </p>
                         <p className="text-sm text-muted-foreground pb-3">
                             A list of our most recently joined members, including undergraduate and graduate students actively participating in the community.
                         </p>
                         <MemberTable mode={"Unarchived"}   reload={reloadArchived} data={archivedMember}/>
                     </div>
                 </div>
             </>


    );
}

export default Dashboard;