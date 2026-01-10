"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CompanyDashboard() {
    const { data: session } = useSession()
    const router = useRouter()
    const user = session?.user as any

    useEffect(() => {
        // Redirect if user is not a company
        if (session && user?.role !== "company") {
            router.push("/dashboard")
        }
    }, [session, user, router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                        Company Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Welcome back, {user?.name}! Manage your company profile and job postings.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Post a Job Card */}
                    <div className="group relative overflow-hidden rounded-xl border border-emerald-200/30 bg-white/50 backdrop-blur-sm p-8 hover:border-emerald-400/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                                <svg
                                    className="h-6 w-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Post a Job</h3>
                            <p className="text-muted-foreground mb-4">
                                Create a new job listing to attract talented candidates
                            </p>
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                Post Job
                            </Button>
                        </div>
                    </div>

                    {/* View Applications Card */}
                    <div className="group relative overflow-hidden rounded-xl border border-blue-200/30 bg-white/50 backdrop-blur-sm p-8 hover:border-blue-400/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                                <svg
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Applications</h3>
                            <p className="text-muted-foreground mb-4">
                                Review and manage candidate applications
                            </p>
                            <Button variant="outline">View Applications</Button>
                        </div>
                    </div>

                    {/* Company Profile Card */}
                    <div className="group relative overflow-hidden rounded-xl border border-purple-200/30 bg-white/50 backdrop-blur-sm p-8 hover:border-purple-400/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                                <svg
                                    className="h-6 w-6 text-purple-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Company Profile</h3>
                            <p className="text-muted-foreground mb-4">
                                Update your company information and details
                            </p>
                            <Button variant="outline">Edit Profile</Button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200/30 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Active Jobs</p>
                                <p className="text-3xl font-bold text-emerald-600">0</p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/30 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Total Applications</p>
                                <p className="text-3xl font-bold text-blue-600">0</p>
                            </div>
                            <div className="text-4xl">📨</div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/30 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Profile Views</p>
                                <p className="text-3xl font-bold text-purple-600">0</p>
                            </div>
                            <div className="text-4xl">👁️</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
