import type {
    AnalyzeResumeAgainstJobDescriptionOutput
} from '@/ai/flows/analyze-resume-against-job-description';
import type {
    GenerateResumeImprovementTipsOutput
} from '@/ai/flows/generate-resume-improvement-tips';
import type {
    GenerateUpdatedResumeOutput
} from '@/ai/flows/generate-updated-resume';
import { z } from 'zod';

const schema = z.object({
    resumeFileUri: z.string().startsWith("data:", { message: "Resume must be a valid data URI." }),
    jobDescriptionText: z.string().min(50, "Job description text must be at least 50 characters."),
});

export async function getAnalysis(input: { resumeFileUri: string, jobDescriptionText: string }): Promise<{ analysis: AnalyzeResumeAgainstJobDescriptionOutput, tips: GenerateResumeImprovementTipsOutput }> {
    const validation = schema.safeParse(input);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/cv/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get analysis from AI service.");
    }

    return response.json();
}

export async function createUpdatedResume(input: { resumeFileUri: string, jobDescriptionText: string }): Promise<GenerateUpdatedResumeOutput> {
    const validation = schema.safeParse(input);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/cv/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create updated resume from AI service.");
    }

    return response.json();
}
