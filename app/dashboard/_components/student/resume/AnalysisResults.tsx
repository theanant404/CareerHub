import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Lightbulb,
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  FileText,
  BriefcaseBusiness,
  Brain,
  Palette,
  AlignLeft,
  Wand2
} from 'lucide-react';
import type { AnalyzeResumeAgainstJobDescriptionOutput } from '@/ai/flows/analyze-resume-against-job-description';
import type { GenerateResumeImprovementTipsOutput } from '@/ai/flows/generate-resume-improvement-tips';
import { cn } from '@/lib/utils';

type AnalysisResultProps = {
  result: {
    analysis: AnalyzeResumeAgainstJobDescriptionOutput;
    tips: GenerateResumeImprovementTipsOutput;
  };
  jobDescription: string;
  resumeFileUri: string;
};

const getTipIcon = (area: string) => {
    const lowerArea = area.toLowerCase();
    if (lowerArea.includes('keyword')) return <FileText className="h-6 w-6 text-primary" />;
    if (lowerArea.includes('experience')) return <BriefcaseBusiness className="h-6 w-6 text-primary" />;
    if (lowerArea.includes('skill')) return <Brain className="h-6 w-6 text-primary" />;
    if (lowerArea.includes('format')) return <Palette className="h-6 w-6 text-primary" />;
    if (lowerArea.includes('summary')) return <AlignLeft className="h-6 w-6 text-primary" />;
    return <Lightbulb className="h-6 w-6 text-primary" />;
};

export function AnalysisResults({ result, jobDescription, resumeFileUri }: AnalysisResultProps) {
  const { analysis, tips } = result;

  const handleCreateUpdatedCV = () => {
    try {
      localStorage.setItem('resumeDataForUpdate', JSON.stringify({
        jobDescription,
        resumeFileUri,
      }));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  };

  return (
    <Card className="mt-8 shadow-lg border-0 bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          Your Analysis is Ready!
        </CardTitle>
        <CardDescription className="text-base text-foreground/80">
          Here's your personalized feedback and improvement tips.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 text-base md:text-lg">
            <TabsTrigger value="analysis">
              <ClipboardCheck className="mr-2" />
              Analysis Report
            </TabsTrigger>
            <TabsTrigger value="tips">
              <Lightbulb className="mr-2" />
              Improvement Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <CardTitle className="font-headline">Match Score</CardTitle>
                    <span className="text-2xl font-bold font-headline text-primary">{analysis.matchScore}%</span>
                </div>
                <Progress
                    value={analysis.matchScore}
                    className="w-full h-2"
                    indicatorClassName={cn({
                        "bg-green-500": analysis.matchScore > 75,
                        "bg-yellow-500": analysis.matchScore > 50 && analysis.matchScore <= 75,
                        "bg-red-500": analysis.matchScore <= 50,
                    })}
                />
                <CardDescription className="pt-4 !text-base text-center">{analysis.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-xl font-headline flex items-center gap-2">
                            <CheckCircle2 className="text-green-500" />
                            Strengths
                        </h3>
                        <ul className="list-inside list-disc pl-2 space-y-2 text-sm text-foreground/80">
                            {analysis.strengths.map((strength, i) => <li key={i}>{strength}</li>)}
                        </ul>
                    </div>
                     <div className="space-y-3">
                        <h3 className="text-xl font-headline flex items-center gap-2">
                            <XCircle className="text-red-500" />
                            Weaknesses
                        </h3>
                        <ul className="list-inside list-disc pl-2 space-y-2 text-sm text-foreground/80">
                            {analysis.weaknesses.map((weakness, i) => <li key={i}>{weakness}</li>)}
                        </ul>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-xl font-headline mb-3">Keyword Analysis</h3>
                    <div>
                        <h4 className="font-semibold mb-2">Keywords Found</h4>
                         <div className="flex flex-wrap gap-2">
                            {analysis.keywordAnalysis.mentionedKeywords.length > 0 ? analysis.keywordAnalysis.mentionedKeywords.map(keyword => (
                                <Badge key={keyword} variant="secondary" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">{keyword}</Badge>
                            )) : <p className="text-sm text-muted-foreground">No matching keywords found.</p>}
                         </div>
                    </div>
                    <div>
                         <h4 className="font-semibold mb-2">Keywords Missing</h4>
                         <div className="flex flex-wrap gap-2">
                             {analysis.keywordAnalysis.missingKeywords.length > 0 ? analysis.keywordAnalysis.missingKeywords.map(keyword => (
                                <Badge key={keyword} variant="secondary" className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">{keyword}</Badge>
                            )) : <p className="text-sm text-muted-foreground">No critical keywords seem to be missing. Great job!</p>}
                         </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.improvementTips.map((tip, i) => (
                    <Card key={i} className="flex flex-col items-start p-6 gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 rounded-full p-3">
                               {getTipIcon(tip.area)}
                            </div>
                            <h3 className="font-headline text-xl flex-1">{tip.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center mt-4">
        <Link href="/edit-resume" passHref>
            <Button onClick={handleCreateUpdatedCV} size="lg" className="font-bold">
                <Wand2 className="mr-2 h-5 w-5" />
                Create an Updated CV with AI
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
