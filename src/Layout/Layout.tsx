import {SidebarInset, SidebarProvider, SidebarTrigger} from "../components/ui/sidebar.tsx";
import {AppSidebar} from "../components/app-sidebar.tsx";

import {Outlet} from "react-router-dom";
import {Separator} from "@radix-ui/react-separator";

function Layout() {
    return (
        <SidebarProvider>
            <div className="w-full flex  h-screen ">
                <AppSidebar/>
                <SidebarInset>
                    <>

                        <header className="flex h-auto pt-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />

                            </div>
                        </header>
                        <Outlet/>
                    </>
                </SidebarInset>
            </div>
        </SidebarProvider>

    );
}

export default Layout;