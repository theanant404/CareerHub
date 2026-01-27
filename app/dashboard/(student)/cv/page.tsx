"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAnalysis } from '@/services/cv.services';

import { Sparkles } from 'lucide-react';

import type { AnalyzeResumeAgainstJobDescriptionOutput } from '@/ai/flows/analyze-resume-against-job-description';
import type { GenerateResumeImprovementTipsOutput } from '@/ai/flows/generate-resume-improvement-tips';
import { FileUpload } from '@/app/dashboard/_components/student/resume/FileUpload'
import { AnalysisSkeleton } from '@/app/dashboard/_components/student/resume/AnalysisSkeleton';
import { AnalysisResults } from '@/app/dashboard/_components/student/resume/AnalysisResults';

type AnalysisResult = {
    analysis: AnalyzeResumeAgainstJobDescriptionOutput;
    tips: GenerateResumeImprovementTipsOutput;
} | null;


export default function CvPage() {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeFileUri, setResumeFileUri] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const readFileAsDataUri = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAnalysis = async () => {
        if (!jobDescription.trim() || !resumeFile) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please provide both a job description and your resume file.",
            });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const fileUri = await readFileAsDataUri(resumeFile);
            setResumeFileUri(fileUri);
            const result = await getAnalysis({ jobDescriptionText: jobDescription, resumeFileUri: fileUri });
            setAnalysisResult(result);
        } catch (e: any) {
            console.error(e);
            const errorMessage = e.message || "An error occurred during analysis. Please try again later.";
            toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background min-h-screen">
            <main className="container mx-auto pb-12 px-4">
                <div className="grid grid-cols-1 md:max-w-4xl mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Optimize Your Resume</CardTitle>
                            <CardDescription>
                                Paste the job description and upload your resume. Our AI will analyze it and provide feedback.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid w-full gap-2">
                                <Label htmlFor="job-description" className="font-semibold">Job Description</Label>
                                <Textarea
                                    id="job-description"
                                    placeholder="Paste the full job description here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={8}
                                    className="bg-background"
                                />
                            </div>
                            <FileUpload file={resumeFile} onFileChange={(file) => {
                                setResumeFile(file);
                                if (!file) {
                                    setResumeFileUri(null);
                                }
                            }} />
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleAnalysis} disabled={isLoading} className="w-full">
                                <Sparkles className="mr-2 h-4 w-4" />
                                {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {isLoading && <AnalysisSkeleton />}

                    {analysisResult && resumeFileUri && (
                        <div className="animate-fade-in">
                            <AnalysisResults
                                result={analysisResult}
                                jobDescription={jobDescription}
                                resumeFileUri={resumeFileUri}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
