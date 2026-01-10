"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CheckRolePage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return

        if (status === "unauthenticated") {
            router.push("/login")
            return
        }

        if (session?.user) {
            const userRole = (session.user as any)?.role

            if (!userRole || userRole === undefined) {
                // No role - go to role selection
                router.push("/select-role")
            } else {
                // Has role - go to appropriate dashboard
                if (userRole === "company") {
                    router.push("/dashboard/company")
                } else {
                    router.push("/dashboard")
                }
            }
        }
    }, [session, status, router])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                <p className="text-muted-foreground">Checking your role...</p>
            </div>
        </div>
    )
}
