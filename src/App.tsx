import './App.css'
import Login from "./Pages/Login.tsx";
import {useAuth} from "./Context/AuthProvider.tsx";
import Loadingstate from "./components/Loadingstate.tsx";
import Layout from "./Layout/Layout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./Pages/Dashboard.tsx";
import Members from "./Pages/Members.tsx";
import Archived from "./Pages/Archived.tsx";
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
        }



        ],
        errorElement:<p>404</p>

    }])

    return (
        <>
            <RouterProvider  router={router}/>
        </>
    )
}

export default App
