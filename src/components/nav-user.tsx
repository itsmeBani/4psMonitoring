"use client"

import {
    BadgeCheck,

    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "./ui/sidebar.tsx"
import {useAuth} from "../Context/AuthProvider.tsx";

type UserDataProps = {
  Id:string
  data:[{
    user : {
      email : string
    }
  }]
  avatar:string
  name:string

};

interface NavUserProps {
    User?: UserDataProps[] | undefined | null
}

export function NavUser({User} : NavUserProps) {

    const {isMobile} = useSidebar()
    const {HandleLogout} = useAuth()


  return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage className={"object-cover"} src={User ? User[0]?.avatar : "https://github.com/shadcn.png"} alt={"avatar"}/>
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{User ? User[0]?.name : "administrator"}</span>
                                <span className="truncate text-xs">{User ? User[0]?.data[0].user?.email : "....."}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                  <AvatarImage className={"object-cover"}  src={User ? User[0]?.avatar : "https://github.com/shadcn.png"} alt={"avatar"}/>
                                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                  <span className="truncate font-medium">{User ? User[0]?.name : "administrator"}</span>
                                  <span className="truncate text-xs">{User ? User[0]?.data[0].user?.email : "....."}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck/>
                                Account
                            </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={HandleLogout} variant={"destructive"}>
                            <LogOut/>
                            <p>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
