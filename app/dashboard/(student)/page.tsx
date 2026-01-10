"use client"

import { Suspense } from "react"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardContent from "../_components/dashboard-content"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login")
    }

    // Redirect company users to company dashboard
    if (session?.user) {
      const user = session.user as any
      if (user.role === "company") {
        router.push("/dashboard/company")
      }
    }
  }, [status, router, session])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center fade-in">
        <div className="glassmorphic p-8 rounded-2xl border-foreground/10 scale-in">
          <div className="flex items-center gap-3">
            <Loader className="w-5 h-5 text-foreground animate-spin" />
            <span className="text-foreground font-medium">Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (status === "unauthenticated" || !session) {
    return null
  }

  // Don't render if user is a company (they should be redirected)
  const user = session.user as any
  if (user?.role === "company") {
    return null
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center fade-in">
          <div className="glassmorphic p-8 rounded-2xl border-foreground/10 scale-in">
            <div className="flex items-center gap-3">
              <Loader className="w-5 h-5 text-foreground animate-spin" />
              <span className="text-foreground font-medium">Loading dashboard...</span>
            </div>
          </div>
        </div>
      }
    >
      <DashboardContent session={session as any} />
    </Suspense>
  )
}
