import './App.css'
import Login from "./Pages/Login.tsx";
import {useAuth} from "./Context/AuthProvider.tsx";
import Loadingstate from "./components/Loadingstate.tsx";
import Layout from "./Layout/Layout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./Pages/Dashboard.tsx";
import Members from "./Pages/Members.tsx";
import Archived from "./Pages/Archived.tsx";
import Students from "./Pages/Students.tsx";

function App() {
    const {User}=useAuth()
    if (User === null) return  <Login/>
    if (User === undefined) return <Loadingstate/>
    const router=createBrowserRouter([{
        path:"/",
        element:<Layout/>,
        children:[{
            path : "/",
            element:<Dashboard/>
        },{
            path : "/members",
            element:<Members/>
        },{
            path : "/archived",
            element:<Archived/>
        },{
            path : "/students",
            element:<Students/>
        }



        ],
        errorElement:<p>404</p>

    }])

    return (
        <div className="">
            <RouterProvider  router={router}/>
        </div>
    )
}

export default App
