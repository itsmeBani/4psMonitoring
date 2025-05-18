import {BanIcon, CircleCheck, Loader} from "lucide-react";



function EducationalStatus({status}:{status:string})  {
    return (
        status === "Graduated" ? <div
                    className="flex p-1   rounded-md border-[1px] text-gray-500 gap-1 text-[12px] border-gray-400">
                    <CircleCheck size={16} className=" text-green-500"/>{status}</div> :
            status === "Undergraduate" ?

                <div
                    className="flex p-1 rounded-md border-[1px] text-gray-500 gap-1 text-[12px] border-gray-400">
                    <Loader size={16}/>{status} </div> :

                <div
                    className="flex p-1 rounded-md border-[1px] text-gray-500 gap-1 text-[12px] border-gray-400">
                    <BanIcon size={16} className="text-red-500"/>{status} </div>



    );
}

export default EducationalStatus;