'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a resume against a job description.
 *
 * It exports:
 * - `analyzeResumeAgainstJobDescription`: An async function that takes a resume and job description as input and returns an analysis of how well the resume matches the job description.
 * - `AnalyzeResumeAgainstJobDescriptionInput`: The TypeScript type definition for the input to the `analyzeResumeAgainstJobDescription` function.
 * - `AnalyzeResumeAgainstJobDescriptionOutput`: The TypeScript type definition for the output of the `analyzeResumeAgainstJobDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  prompt: `You are an expert hiring manager and resume analyst. Analyze the provided resume against the job description.

Provide a comprehensive analysis by returning the following structured data:
- \`matchScore\`: An integer score from 0 to 100 indicating the resume's compatibility with the job description. 100 is a perfect match.
- \`summary\`: A concise, one or two-sentence summary of the analysis.
- \`strengths\`: A list of the top 3-5 strengths of the resume that directly relate to the job requirements.
- \`weaknesses\`: A list of the top 3-5 weaknesses or areas where the resume falls short of the job requirements.
- \`keywordAnalysis\`:
    - \`mentionedKeywords\`: A list of important keywords and skills from the job description that were found in the resume.
    - \`missingKeywords\`: A list of critical keywords and skills from the job description that are missing from the resume.

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
    const {output} = await analyzeResumeAgainstJobDescriptionPrompt(input);
    return output!;
  }
);
