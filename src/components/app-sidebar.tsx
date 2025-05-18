import * as React from "react"
import {
  Users,
  HandCoins,
  LayoutDashboard, ArchiveIcon
} from "lucide-react"

import { NavContent } from "./NavContent.tsx"
import { NavUser } from "./nav-user"
import { NavHeader } from "./NavHeader.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar.tsx"
import {useAuth} from "../Context/AuthProvider.tsx";


const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "https://github.com/shadcn.png",
  },
  header: [
    {
      name: "4ps Monitoring",
      logo: HandCoins,
      plan: "Tracking",
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Members",
      url: "/members",
      icon: Users,
    },
    {
      name: "Archive",
      url: "/archived",
      icon: ArchiveIcon,
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {User}=useAuth()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <NavHeader  header={data.header} />
      </SidebarHeader>
      <SidebarContent >

        <NavContent projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser User={User} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
