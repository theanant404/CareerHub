"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

type TagInputProps = {
    label: string
    name: string
    placeholder: string
    suggestions?: string[]
}

function TagInput({ label, name, placeholder, suggestions = [] }: TagInputProps) {
    const [tags, setTags] = useState<string[]>([])
    const [value, setValue] = useState("")

    const addTag = (tag: string) => {
        const t = tag.trim()
        if (!t) return
        if (tags.includes(t)) return
        setTags((prev) => [...prev, t])
        setValue("")
    }

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTag(value)
        } else if (e.key === "Backspace" && !value && tags.length) {
            e.preventDefault()
            removeTag(tags[tags.length - 1])
        }
    }

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="rounded-md border p-2">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-2">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`} className="text-xs opacity-70 hover:opacity-100">
                                ✕
                            </button>
                            {/* Hidden input for each tag to submit as array */}
                            <input type="hidden" name={`${name}[]`} value={tag} />
                        </Badge>
                    ))}
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-7 w-auto flex-1 min-w-[160px]"
                    />
                </div>
                {suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                            <Button key={s} type="button" variant="outline" size="sm" onClick={() => addTag(s)}>
                                {s}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

const techSuggestions = [
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Go",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
]

const toolSuggestions = ["Slack", "Jira", "Notion", "GitHub", "GitLab", "Linear", "Asana"]

const cultureOptions = [
    "Open Source Contributor",
    "Agile/Scrum",
    "CI/CD Focused",
    "Test-Driven Development",
]

export default function TechnicalOperationalStackPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [culture, setCulture] = useState<Record<string, boolean>>({})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        const fd = new FormData(event.currentTarget)
        const payload: any = {
            primaryTechStack: fd.getAll("primaryTechStack[]"),
            internalTools: fd.getAll("internalTools[]"),
            engineeringCulture: Object.keys(culture).filter((k) => culture[k]),
        }
        console.log("Submitting technical & operational stack", payload)
        setIsSubmitting(false)
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Technical & Operational Stack</h1>
                <p className="text-sm text-muted-foreground">
                    Help us match tech-heavy roles by describing your stack and practices.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <TagInput
                    label="Primary Tech Stack"
                    name="primaryTechStack"
                    placeholder="Type a technology and press Enter"
                    suggestions={techSuggestions}
                />

                <TagInput
                    label="Internal Tools"
                    name="internalTools"
                    placeholder="Type a tool and press Enter"
                    suggestions={toolSuggestions}
                />

                <div className="space-y-3">
                    <Label>Engineering Culture</Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {cultureOptions.map((opt) => (
                            <label key={opt} className="flex items-center gap-3">
                                <Checkbox
                                    checked={!!culture[opt]}
                                    onCheckedChange={(v) => setCulture((prev) => ({ ...prev, [opt]: Boolean(v) }))}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Stack"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

