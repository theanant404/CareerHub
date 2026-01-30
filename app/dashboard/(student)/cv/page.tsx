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
    const [showJobDetails, setShowJobDetails] = useState(true);
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
        setShowJobDetails(false);

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
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="font-headline text-3xl md:text-4xl">Optimize Your Resume</h1>
                        <p className="text-muted-foreground">
                            Paste a job description and upload your resume to get tailored, project-specific feedback.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className={`shadow-lg lg:col-span-2 ${showJobDetails ? '' : 'lg:col-span-1'}`}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="font-headline text-2xl">Job Details</CardTitle>
                                    {!showJobDetails && (
                                        <Button variant="outline" size="sm" onClick={() => setShowJobDetails(true)}>
                                            Edit job details
                                        </Button>
                                    )}
                                </div>
                                <CardDescription>
                                    Use a complete job posting for the most accurate analysis.
                                </CardDescription>
                            </CardHeader>
                            {showJobDetails ? (
                                <>
                                    <CardContent className="space-y-6">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="job-description" className="font-semibold">Job Description</Label>
                                            <Textarea
                                                id="job-description"
                                                placeholder="Paste the full job description here..."
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                rows={10}
                                                className="bg-background"
                                            />
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>Recommended: 200+ characters for higher accuracy</span>
                                                <span>{jobDescription.length} characters</span>
                                            </div>
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
                                </>
                            ) : (
                                <CardContent className="space-y-4">
                                    <div className="rounded-md border p-3 text-sm text-muted-foreground">
                                        <p className="font-semibold text-foreground">Job description locked</p>
                                        <p className="mt-1">Edit to rerun analysis with updated details.</p>
                                    </div>
                                    <Button onClick={handleAnalysis} disabled={isLoading} className="w-full" variant="secondary">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        {isLoading ? 'Analyzing...' : 'Re-run Analysis'}
                                    </Button>
                                </CardContent>
                            )}
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">What You’ll Get</CardTitle>
                                <CardDescription>
                                    Clear, section-by-section feedback with a focus on projects and impact.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-muted-foreground">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>ATS-style match score and summary</li>
                                    <li>Strengths and gaps by requirement</li>
                                    <li>Keyword coverage analysis</li>
                                    <li>Project-specific improvement tips</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
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
                </div>
            </main>
        </div>
    );
}
