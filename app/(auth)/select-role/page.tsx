"use client"

import { use, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { RoleSelectionDialog } from "@/app/(auth)/_components/role-selection-dialog"

export default function SelectRolePage() {
    const { data: session, status, } = useSession()

    const router = useRouter()

    useEffect(() => {
        // If user is not authenticated, redirect to login
        if (status === "unauthenticated") {
            router.push("/login")
            return
        }

        // If user already has a role, redirect to their dashboard
        if (session?.user) {
            const userRole = (session.user as any)?.role
            if (userRole && userRole !== undefined) {
                if (userRole === "company") {
                    router.push("/dashboard/company")
                } else {
                    router.push("/dashboard")
                }
            }
        }
    }, [session, status, router])

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (status === "unauthenticated" || !session?.user) {
        return null
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <RoleSelectionDialog
                isOpen={true}
                userEmail={(session.user as any).email || ""}
                userName={(session.user as any).name || "User"}
            />
        </div>
    )
}
