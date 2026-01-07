"use client"

import * as React from "react"
import {
    Bookmark,
    Briefcase,
    GraduationCap,
    LayoutDashboard,
    Settings,
    Trophy,
    User,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { SideBarLogo } from "../sidebar-logo"
import { NavMain } from "../nav-main"
import { NavProjects } from "../nav-projects"
import { NavUser } from "../nav-user"
import { useSession } from "next-auth/react"

const navMain = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: "Browse Jobs",
        url: "/browse",
        icon: Briefcase,
    },
    {
        title: "Bookmarks",
        url: "/bookmarks",
        icon: Bookmark,
    },
    {
        title: "Assessments",
        url: "/assessments",
        icon: GraduationCap,
    },
    {
        title: "Leaderboard",
        url: "/leaderboard",
        icon: Trophy,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User,
        items: [
            { title: "Overview", url: "/profile" },
            { title: "Edit Profile", url: "/profile/edit" },
            { title: "Settings", url: "/settings" },
        ],
    },
]

const quickLinks = [
    {
        name: "Saved Jobs",
        url: "/bookmarks",
        icon: Bookmark,
    },
    {
        name: "Applications",
        url: "/dashboard/applications",
        icon: Briefcase,
    },
    {
        name: "Skill Growth",
        url: "/assessments",
        icon: GraduationCap,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = useSession();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SideBarLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavProjects projects={quickLinks} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser status={session?.status} user={session?.data?.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
