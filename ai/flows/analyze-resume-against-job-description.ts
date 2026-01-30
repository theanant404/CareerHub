'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a resume against a job description.
 *
 * It exports:
 * - `analyzeResumeAgainstJobDescription`: An async function that takes a resume and job description as input and returns an analysis of how well the resume matches the job description.
 * - `AnalyzeResumeAgainstJobDescriptionInput`: The TypeScript type definition for the input to the `analyzeResumeAgainstJobDescription` function.
 * - `AnalyzeResumeAgainstJobDescriptionOutput`: The TypeScript type definition for the output of the `analyzeResumeAgainstJobDescription` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeResumeAgainstJobDescriptionInputSchema = z.object({
  resumeFileUri: z
    .string()
    .describe('The data URI of the resume file (image or PDF).'),
  jobDescriptionText: z
    .string()
    .describe('The text content of the job description to analyze against.'),
});

export type AnalyzeResumeAgainstJobDescriptionInput = z.infer<
  typeof AnalyzeResumeAgainstJobDescriptionInputSchema
>;

const AnalyzeResumeAgainstJobDescriptionOutputSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score from 0 to 100 representing how well the resume matches the job description.'
    ),
  summary: z
    .string()
    .describe('A brief one or two-sentence summary of the match.'),
  strengths: z
    .array(z.string())
    .describe(
      'A list of key strengths from the resume that align with the job description.'
    ),
  weaknesses: z
    .array(z.string())
    .describe(
      'A list of key weaknesses or areas where the resume is lacking.'
    ),
  keywordAnalysis: z.object({
    mentionedKeywords: z
      .array(z.string())
      .describe('Keywords from the job description found in the resume.'),
    missingKeywords: z
      .array(z.string())
      .describe(
        'Important keywords from the job description missing from the resume.'
      ),
  }),
});


export type AnalyzeResumeAgainstJobDescriptionOutput = z.infer<
  typeof AnalyzeResumeAgainstJobDescriptionOutputSchema
>;

export async function analyzeResumeAgainstJobDescription(
  input: AnalyzeResumeAgainstJobDescriptionInput
): Promise<AnalyzeResumeAgainstJobDescriptionOutput> {
  return analyzeResumeAgainstJobDescriptionFlow(input);
}

const analyzeResumeAgainstJobDescriptionPrompt = ai.definePrompt({
  name: 'analyzeResumeAgainstJobDescriptionPrompt',
  input: {
    schema: AnalyzeResumeAgainstJobDescriptionInputSchema,
  },
  output: {
    schema: AnalyzeResumeAgainstJobDescriptionOutputSchema,
  },
  prompt: `You are an expert hiring manager and ATS resume analyst. Analyze the resume against the job description.

Use only evidence from the resume and the job description. Do not invent details. If evidence is missing, note it as missing. Prefer concise, actionable insights.

Scoring guidance:
- \`matchScore\` is 0–100 based on alignment across skills, experience level, domain fit, and keywords.
- 90–100: strong alignment with most critical requirements.
- 70–89: good alignment with some gaps.
- 50–69: partial alignment with notable gaps.
- <50: weak alignment with major gaps.

Output must strictly follow the schema:
- \`matchScore\`: integer 0–100.
- \`summary\`: 1–2 sentences; mention overall fit and top gap.
- \`strengths\`: 3–5 bullet-style phrases that map directly to job requirements.
- \`weaknesses\`: 3–5 bullet-style phrases describing missing skills/experience or unclear evidence.
- \`keywordAnalysis\`:
  - \`mentionedKeywords\`: 6–12 key terms found in the resume that appear (or closely match) the job description.
  - \`missingKeywords\`: 6–12 critical terms from the job description that are absent or weakly evidenced in the resume.

Resume File:
{{media url=resumeFileUri}}

Job Description Text:
{{jobDescriptionText}}`,
});

const analyzeResumeAgainstJobDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAgainstJobDescriptionFlow',
    inputSchema: AnalyzeResumeAgainstJobDescriptionInputSchema,
    outputSchema: AnalyzeResumeAgainstJobDescriptionOutputSchema,
  },
  async input => {
    const { output } = await analyzeResumeAgainstJobDescriptionPrompt(input);
    return output!;
  }
);
