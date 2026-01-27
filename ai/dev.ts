import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-resume-against-job-description.ts';
import '@/ai/flows/generate-resume-improvement-tips.ts';
import '@/ai/flows/generate-updated-resume.ts';
