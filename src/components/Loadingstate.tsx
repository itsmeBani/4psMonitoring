
import {Loader2} from "lucide-react";

function LoadingState() {
    return (
        <div className={"w-full h-screen flex justify-center pt-20"}><Loader2 size={50} className={"text-green-700 animate-spin"}/></div>
    );
}

export default LoadingState;