"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const industries = [
    "SaaS",
    "E-commerce",
    "Fintech",
    "Healthcare",
    "EdTech",
    "AI/ML",
    "Cybersecurity",
    "Gaming",
    "Logistics",
    "Manufacturing",
]

const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "500+",
]

export default function CompanyBasicInfoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(event.currentTarget)
        // TODO: send formData to API endpoint
        console.log("Submitting company basic info", Object.fromEntries(formData.entries()))
        setIsSubmitting(false)
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Company Profile · Basic Info</h1>
                <p className="text-sm text-muted-foreground">
                    Establish who the company is and its brand presence.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input id="name" name="name" placeholder="Acme Corp" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tagline">One-Line Tagline</Label>
                        <Input
                            id="tagline"
                            name="tagline"
                            placeholder="Revolutionizing renewable energy for the 21st century."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry / Sector</Label>
                        <Select name="industry">
                            <SelectTrigger id="industry">
                                <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {industries.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="size">Company Size</Label>
                        <Select name="size">
                            <SelectTrigger id="size">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {companySizes.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <Input id="logo" name="logo" type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground">Upload a high-resolution logo (PNG, JPG, SVG).</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="about">About Company</Label>
                    <Textarea
                        id="about"
                        name="about"
                        placeholder="Describe your history, mission, and goals..."
                        className="min-h-[160px]"
                    />
                    <p className="text-xs text-muted-foreground">Use rich text in future; currently accepts plain text.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="hq">Headquarters</Label>
                    <Input id="hq" name="hq" placeholder="City, State, Country" />
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Basic Info"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
