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
import { MarkdownTextArea } from "@/components/markdown-text-area"

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
    const [about, setAbout] = useState("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(event.currentTarget)
        // Basic validation for fraud detection
        const regNum = formData.get("registrationNumber")?.toString().trim() || ""
        const gstPan = formData.get("gstPan")?.toString().trim() || ""
        const emailDomain = formData.get("emailDomain")?.toString().trim() || ""
        const logoFile = formData.get("logo") as File
        // Registration number format (example: alphanumeric, 8-15 chars)
        if (!/^\w{8,15}$/.test(regNum)) {
            alert("Invalid registration number format.")
            setIsSubmitting(false)
            return
        }
        // GST/PAN format (example: 10-15 chars)
        if (!/^\w{10,15}$/.test(gstPan)) {
            alert("Invalid GST/PAN format.")
            setIsSubmitting(false)
            return
        }
        // Email domain format
        if (!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(emailDomain)) {
            alert("Invalid email domain format.")
            setIsSubmitting(false)
            return
        }
        // Logo file validation
        if (logoFile && logoFile.size > 2 * 1024 * 1024) {
            alert("Logo file size should be less than 2MB.")
            setIsSubmitting(false)
            return
        }
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
                        <Label htmlFor="name">Company Name <span className="text-red-500">*</span></Label>
                        <Input id="name" name="name" placeholder="Acme Corp" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tagline">One-Line Tagline <span className="text-red-500">*</span></Label>
                        <Input
                            id="tagline"
                            name="tagline"
                            placeholder="Revolutionizing renewable energy for the 21st century."
                            required
                        />
                    </div>
                    <div className=" flex flex-row justify-between">
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry / Sector <span className="text-red-500">*</span></Label>
                            <Select name="industry" required>
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
                            <Label htmlFor="size">Company Size <span className="text-red-500">*</span></Label>
                            <Select name="size" required>
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
                        <Label htmlFor="registrationNumber">Registration Number <span className="text-red-500">*</span></Label>
                        <Input id="registrationNumber" name="registrationNumber" placeholder="e.g. 12345678AB" required />
                        <p className="text-xs text-muted-foreground">Official company registration number (8-15 alphanumeric).</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gstPan">GST/PAN <span className="text-red-500">*</span></Label>
                        <Input id="gstPan" name="gstPan" placeholder="e.g. 22AAAAA0000A1Z5" required />
                        <p className="text-xs text-muted-foreground">GST or PAN number (10-15 alphanumeric).</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="emailDomain">Official Email Domain <span className="text-red-500">*</span></Label>
                        <Input id="emailDomain" name="emailDomain" placeholder="company.com" required />
                        <p className="text-xs text-muted-foreground">Must match your website domain (e.g., acme.com).</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="foundingYear">Founding Year <span className="text-red-500">*</span></Label>
                        <Input id="foundingYear" name="foundingYear" type="number" min="1800" max="{new Date().getFullYear()}" placeholder="e.g. 2010" required />
                        <p className="text-xs text-muted-foreground">Year the company was founded.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logo">Company Logo <span className="text-red-500">*</span></Label>
                    <Input id="logo" name="logo" type="file" accept="image/*" required />
                    <p className="text-xs text-muted-foreground">Upload a high-resolution logo (PNG, JPG, SVG, &lt;2MB).</p>
                </div>

                <div className="space-y-2">
                    <MarkdownTextArea
                        label="About Company"
                        name="about"
                        placeholder="Describe your company..."
                        value={about}
                        onChange={(value) => setAbout(value)}
                        rows={10}
                        required
                    />
                    <p className="text-xs text-muted-foreground">Use rich text in future; currently accepts plain text.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="hq">Headquarters <span className="text-red-500">*</span></Label>
                    <Input id="hq" name="hq" placeholder="City, State, Country" required />
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
