"use client"

import * as React from "react"
import {
    BarChart3,
    Briefcase,
    ClipboardList,
    FileText,
    Settings2,
    Users,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "../nav-user"
import { NavProjects } from "../nav-projects"
import { NavMain } from "../nav-main"
import { SideBarLogo } from "../sidebar-logo"
import { useSession } from "next-auth/react"
import { title } from "process"

// Company-focused navigation data
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard/company",
            icon: BarChart3,
            isActive: true,
            items: [
                { title: "Dashboard", url: "/dashboard/company" },
                { title: "Analytics", url: "/dashboard/company/analytics" },
            ],
        },
        {
            title: "Job Posts",
            url: "/dashboard/company/jobs",
            icon: Briefcase,
            items: [
                { title: "All Jobs", url: "/dashboard/company/jobs" },
                { title: "Create Job", url: "/dashboard/company/jobs/new" },
            ],
        },
        {
            title: "Applicants",
            url: "/dashboard/company/applicants",
            icon: Users,
            items: [
                { title: "All Applicants", url: "/dashboard/company/applicants" },
                { title: "Interviews", url: "/dashboard/company/applicants/interviews" },
            ],
        },
        {
            title: "Assessments",
            url: "/dashboard/company/assessments",
            icon: ClipboardList,
            items: [
                { title: "Results", url: "/dashboard/company/assessments" },
                { title: "Create Assessment", url: "/dashboard/company/assessments/new" },
            ],
        },
        {
            title: "Profile",
            url: "/dashboard/company/profile",
            icon: FileText,
            items: [
                { title: "View Profile", url: "/dashboard/company/profile" },
                { title: "Basic Info", url: "/dashboard/company/profile/basic-info" },
                { title: "Social Links", url: "/dashboard/company/profile/social-links" },
                { title: "Technical & Operational Stack", url: "/dashboard/company/profile/technical-operational-stack" },
                { title: "Culture & Working Style", url: "/dashboard/company/profile/culture-and-working-style" },
                { title: "Hiring Preferences", url: "/dashboard/company/profile/recruitment-specifics" },
            ],
        }, {
            title: "Settings",
            url: "/dashboard/company/settings",
            icon: Settings2,
            items: [
                { title: "Billing", url: "/dashboard/company/settings/billing" },
                { title: "Team", url: "/dashboard/company/settings/team" },
            ],
        },
    ],
    projects: [
        { name: "Company Profile", url: "/dashboard/company/settings/profile", icon: FileText },
        { name: "Billing", url: "/dashboard/company/settings/billing", icon: Settings2 },
        { name: "Support", url: "/support", icon: FileText },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = useSession();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SideBarLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser status={session?.status} user={session?.data?.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
