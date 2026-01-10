'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "../_components/company/company-app-sidebar"
import { usePathname } from "next/navigation"

export default function Page({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard/company">
                                        Company Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {(() => {
                                    const segments = (pathName || "").split("?")[0].split("/").filter(Boolean)
                                    const companyIdx = segments.indexOf("company")
                                    const trail = companyIdx >= 0 ? segments.slice(companyIdx + 1) : []
                                    const format = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

                                    if (trail.length === 0) return null

                                    const items = trail.map((seg, i) => {
                                        const href = "/dashboard/company/" + trail.slice(0, i + 1).join("/")
                                        const label = format(seg)
                                        const isLast = i === trail.length - 1
                                        return (
                                            <>
                                                <BreadcrumbSeparator key={`sep-${i}`} className="hidden md:block" />
                                                <BreadcrumbItem key={`item-${href}`}>
                                                    {isLast ? (
                                                        <BreadcrumbPage>{label}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </>
                                        )
                                    })
                                    return items
                                })()}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 overflow-auto">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
