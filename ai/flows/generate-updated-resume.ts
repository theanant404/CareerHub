'use server';

/**
 * @fileOverview Generates an updated resume in Markdown format.
 *
 * - generateUpdatedResume - A function that creates an improved resume.
 * - GenerateUpdatedResumeInput - The input type for the function.
 * - GenerateUpdatedResumeOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUpdatedResumeInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
  resumeFileUri: z
    .string()
    .describe('The data URI of the resume file (image or PDF).'),
});
export type GenerateUpdatedResumeInput = z.infer<
  typeof GenerateUpdatedResumeInputSchema
>;

const GenerateUpdatedResumeOutputSchema = z.object({
  updatedResumeMarkdown: z
    .string()
    .describe('The full content of the updated and improved resume in Markdown format.'),
});

export type GenerateUpdatedResumeOutput = z.infer<
  typeof GenerateUpdatedResumeOutputSchema
>;

export async function generateUpdatedResume(
  input: GenerateUpdatedResumeInput
): Promise<GenerateUpdatedResumeOutput> {
  return generateUpdatedResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUpdatedResumePrompt',
  input: {schema: GenerateUpdatedResumeInputSchema},
  output: {schema: GenerateUpdatedResumeOutputSchema},
  prompt: `You are an expert resume writer and career coach.
Based on the provided resume and the target job description, rewrite the resume to be much stronger and better aligned with the role.
The output should be a complete, professionally formatted resume in Markdown.
Ensure you incorporate best practices for resume writing, such as using action verbs, quantifying achievements, and tailoring the content to the job description.
Format the output strictly as Markdown.

Job Description:
{{jobDescription}}

Original Resume File:
{{media url=resumeFileUri}}`,
});

const generateUpdatedResumeFlow = ai.defineFlow(
  {
    name: 'generateUpdatedResumeFlow',
    inputSchema: GenerateUpdatedResumeInputSchema,
    outputSchema: GenerateUpdatedResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
