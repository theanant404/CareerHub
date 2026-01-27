'use server';

import {
    analyzeResumeAgainstJobDescription,
    type AnalyzeResumeAgainstJobDescriptionOutput
} from '@/ai/flows/analyze-resume-against-job-description';
import {
    generateResumeImprovementTips,
    type GenerateResumeImprovementTipsOutput
} from '@/ai/flows/generate-resume-improvement-tips';
import {
    generateUpdatedResume,
    type GenerateUpdatedResumeOutput
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

    const { resumeFileUri, jobDescriptionText } = validation.data;

    try {
        const [analysisResult, tipsResult] = await Promise.all([
            analyzeResumeAgainstJobDescription({ resumeFileUri, jobDescriptionText }),
            generateResumeImprovementTips({ resumeFileUri, jobDescription: jobDescriptionText }),
        ]);

        return {
            analysis: analysisResult,
            tips: tipsResult,
        };
    } catch (error) {
        console.error("Error in AI analysis:", error);
        throw new Error("Failed to get analysis from AI service.");
    }
}

export async function createUpdatedResume(input: { resumeFileUri: string, jobDescriptionText: string }): Promise<GenerateUpdatedResumeOutput> {
    const validation = schema.safeParse(input);
    if (!validation.success) {
        throw new Error(validation.error.errors.map(e => e.message).join(', '));
    }

    const { resumeFileUri, jobDescriptionText } = validation.data;

    try {
        const result = await generateUpdatedResume({ resumeFileUri, jobDescription: jobDescriptionText });
        return result;
    } catch (error) {
        console.error("Error creating updated resume:", error);
        throw new Error("Failed to create updated resume from AI service.");
    }
}
