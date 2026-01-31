"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building2, Briefcase, Users, Link2 } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    return (
        <main className="p-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Company Profile</h1>
                    <p className="text-muted-foreground mt-2">Manage your company information and settings</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border bg-card p-6 space-y-3">
                        <Building2 className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold text-lg">Basic Information</h3>
                        <p className="text-sm text-muted-foreground">Company details, registration, and contact information</p>
                        <Button onClick={() => router.push('/dashboard/company/profile/edit/basic-info')} className="w-full">
                            Edit Basic Info
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-card p-6 space-y-3">
                        <Users className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold text-lg">Culture & Working Style</h3>
                        <p className="text-sm text-muted-foreground">Work environment, values, and company culture</p>
                        <Button onClick={() => router.push('/dashboard/company/profile/edit/culture-and-working-style')} className="w-full">
                            Edit Culture
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-card p-6 space-y-3">
                        <Briefcase className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold text-lg">Recruitment Specifics</h3>
                        <p className="text-sm text-muted-foreground">Hiring process, requirements, and ideal candidates</p>
                        <Button onClick={() => router.push('/dashboard/company/profile/edit/recruitment-specifics')} className="w-full">
                            Edit Recruitment
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-card p-6 space-y-3">
                        <Link2 className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold text-lg">Social Links</h3>
                        <p className="text-sm text-muted-foreground">Website, social media, and online presence</p>
                        <Button onClick={() => router.push('/dashboard/company/profile/edit/social-links')} className="w-full">
                            Edit Social Links
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
