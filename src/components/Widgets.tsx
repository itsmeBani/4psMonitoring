import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card.tsx";
import {
    BanIcon,
    GraduationCapIcon,

    Loader,
    Users2Icon
} from "lucide-react";

import * as React from "react";
import {useFetchMembers} from "../hooks/useFetchMembers.ts";

interface WidgetInterface {
    title : string,
    value:number | null
    subtitle:string,
    description:string,
    icon :React.ReactNode
}

function Widgets() {
    const {totalQuantity}=useFetchMembers()
    const  WidgetData: WidgetInterface[] = [
        {
            title: "Undergraduate Students",
            value:totalQuantity ?  totalQuantity.Undergraduate : 0,
            subtitle: "Active Students",
            description: "Currently enrolled in undergraduate programs",
            icon: <Loader color={"gray"} size={25}  />,
        },
        {
            title: "Graduated Students",
            value:totalQuantity ?  totalQuantity.Graduated : 0,
            subtitle: "Graduates",
            description: "Successfully completed their degree programs",
            icon: <GraduationCapIcon color={"gray"} size={25}  />,
        },
        {
            title: "Stopped (dropped/inactive)",
            value:totalQuantity ?  totalQuantity.Inactive : 0,
            subtitle: "Inactive",
            description: "Students who have dropped out or are currently inactive",
            icon: <BanIcon color={"gray"}  size={25} />,
        },
        {
            title: "Total Member",
            value:totalQuantity ?  totalQuantity.Total : 0,
            subtitle: "All Students",
            description: "Sum of all enrolled, graduated, and inactive students",
            icon: <Users2Icon color={"gray"} size={25} />,
        },
    ];



    return (
        <header>
            <div className="grid grid-cols-4 gap-4 pb-4 ">
                {WidgetData.map((data,index)=>{

                    return(
                        <Card  key={index} className="@container/card gap-3 relative">
                            <CardHeader className="relative">
                                <CardDescription>  {data.title}</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    {data?.value}
                                </CardTitle>

                            </CardHeader>
                            <div className="absolute right-4 top-4">
                                {data.icon}
                            </div>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {data.subtitle}
                                </div>
                                <div className="text-muted-foreground">
                                    {data.description}
                                </div>
                            </CardFooter>
                        </Card>


                    )
                })

                }
            </div>


        </header>
    );
}

export default Widgets;