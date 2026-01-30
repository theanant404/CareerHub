'use server';

/**
 * @fileOverview Generates personalized tips and suggestions on how to improve a resume based on a job description.
 *
 * - generateResumeImprovementTips - A function that generates resume improvement tips.
 * - GenerateResumeImprovementTipsInput - The input type for the generateResumeImprovementTips function.
 * - GenerateResumeImprovementTipsOutput - The return type for the generateResumeImprovementTips function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateResumeImprovementTipsInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
  resumeFileUri: z
    .string()
    .describe('The data URI of the resume file (image or PDF).'),
});
export type GenerateResumeImprovementTipsInput = z.infer<
  typeof GenerateResumeImprovementTipsInputSchema
>;

const TipSchema = z.object({
  title: z.string().describe("A short, catchy title for the improvement tip (e.g., 'Quantify Your Achievements')."),
  description: z.string().describe("A detailed, actionable explanation of the tip and why it's important for this specific job application."),
  area: z.string().describe("The section of the resume this tip applies to (e.g., 'Keywords', 'Experience', 'Skills').")
});

const GenerateResumeImprovementTipsOutputSchema = z.object({
  improvementTips: z
    .array(TipSchema)
    .min(3)
    .describe('A list of at least 3 personalized tips and suggestions on how to improve the resume.'),
});

export type GenerateResumeImprovementTipsOutput = z.infer<
  typeof GenerateResumeImprovementTipsOutputSchema
>;

export async function generateResumeImprovementTips(
  input: GenerateResumeImprovementTipsInput
): Promise<GenerateResumeImprovementTipsOutput> {
  return generateResumeImprovementTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeImprovementTipsPrompt',
  input: { schema: GenerateResumeImprovementTipsInputSchema },
  output: { schema: GenerateResumeImprovementTipsOutputSchema },
  prompt: `You are an expert resume consultant and ATS reviewer. Provide 5–7 personalized, high-impact tips to improve the resume for this specific job description.

Rules:
- Use only evidence from the resume and job description. Do not invent details.
- Each tip must include: a short title, a detailed actionable description, and an \`area\` label.
- Ensure coverage across key sections: Summary, Experience, Projects, Skills, Education, and Keywords/ATS.
- At least one tip must be specifically about the Projects section (e.g., relevance, impact, tech stack, outcomes).
- If a section is missing or weak, explicitly say so and propose how to improve it.

Job Description:
{{jobDescription}}

Resume File:
{{media url=resumeFileUri}}`,
});

const generateResumeImprovementTipsFlow = ai.defineFlow(
  {
    name: 'generateResumeImprovementTipsFlow',
    inputSchema: GenerateResumeImprovementTipsInputSchema,
    outputSchema: GenerateResumeImprovementTipsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
