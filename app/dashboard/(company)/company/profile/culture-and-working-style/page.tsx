"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const workModes = ["Remote", "On-site", "Hybrid"] as const
const companyValues = [
    "Fast-Paced",
    "Work-Life Balance",
    "Innovation-First",
    "Diversity-Focused",
] as const
const perks = [
    "Flexible Hours",
    "Health Insurance",
    "Free Meals",
    "ESOPs",
    "Learning Stipends",
] as const

export default function CultureAndWorkingStylePage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedWorkMode, setSelectedWorkMode] = useState<string>("")
    const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>({})
    const [selectedPerks, setSelectedPerks] = useState<Record<string, boolean>>({})
    const [photoFiles, setPhotoFiles] = useState<File[]>([])

    const previews = useMemo(
        () => photoFiles.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
        [photoFiles]
    )

    const handlePhotosChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = Array.from(e.target.files ?? [])
        setPhotoFiles(files)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const payload = {
            workMode: selectedWorkMode,
            companyValues: Object.keys(selectedValues).filter((k) => selectedValues[k]),
            perks: Object.keys(selectedPerks).filter((k) => selectedPerks[k]),
            officePhotosCount: photoFiles.length,
        }

        // TODO: Wire to API endpoint to persist
        console.log("Submitting culture & working style", payload)
        setIsSubmitting(false)
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Culture & Working Style</h1>
                <p className="text-sm text-muted-foreground">
                    Help match student personalities by describing how your company works.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Work Mode */}
                <div className="space-y-2">
                    <Label htmlFor="workMode">Work Mode</Label>
                    <Select value={selectedWorkMode} onValueChange={setSelectedWorkMode} name="workMode">
                        <SelectTrigger id="workMode">
                            <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent>
                            {workModes.map((mode) => (
                                <SelectItem key={mode} value={mode}>
                                    {mode}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Company Values */}
                <div className="space-y-3">
                    <Label>Company Values</Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {companyValues.map((val) => (
                            <label key={val} className="flex items-center gap-3">
                                <Checkbox
                                    checked={!!selectedValues[val]}
                                    onCheckedChange={(v) => setSelectedValues((prev) => ({ ...prev, [val]: Boolean(v) }))}
                                />
                                <span>{val}</span>
                                {/* Each checked value also as hidden input for submit via FormData if needed */}
                                {selectedValues[val] && <input type="hidden" name="companyValues[]" value={val} />}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Office Photos */}
                <div className="space-y-2">
                    <Label htmlFor="officePhotos">Office Photos</Label>
                    <Input
                        id="officePhotos"
                        name="officePhotos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotosChange}
                    />
                    {previews.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {previews.map((p) => (
                                <div key={p.url} className="overflow-hidden rounded-md border">
                                    <img src={p.url} alt={p.name} className="h-24 w-full object-cover" />
                                    <p className="truncate px-2 py-1 text-xs text-muted-foreground">{p.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-xs text-muted-foreground">Upload multiple images to showcase your workspace.</p>
                </div>

                {/* Perks & Benefits */}
                <div className="space-y-3">
                    <Label>Perks & Benefits</Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {perks.map((perk) => (
                            <label key={perk} className="flex items-center gap-3">
                                <Checkbox
                                    checked={!!selectedPerks[perk]}
                                    onCheckedChange={(v) => setSelectedPerks((prev) => ({ ...prev, [perk]: Boolean(v) }))}
                                />
                                <span>{perk}</span>
                                {selectedPerks[perk] && <input type="hidden" name="perks[]" value={perk} />}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Culture & Style"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

