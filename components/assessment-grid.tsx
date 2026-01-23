"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, Users, Award, Code, Database, Cloud, Brain, Wrench, 
  ShieldCheck, Smartphone, Binary, ListChecks, Palette, Cpu, 
  GitBranch, Box, Terminal, Zap 
} from "lucide-react"

// Assessment Data Array
const assessments = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "HTML, CSS, JavaScript, React fundamentals",
    icon: Code,
    duration: "30 min",
    questions: 25,
    difficulty: "Intermediate",
    participants: "12.5K",
    passRate: "78%",
    skills: ["HTML/CSS", "JavaScript", "React", "Responsive Design"]
  },
  {
    id: "backend",
    title: "Backend Development", 
    description: "Node.js, Python, API design, databases",
    icon: Database,
    duration: "35 min",
    questions: 30,
    difficulty: "Advanced",
    participants: "8.2K",
    passRate: "65%",
    skills: ["Node.js", "Python", "REST APIs", "Database Design"]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, CI/CD pipelines",
    icon: Cloud,
    duration: "40 min", 
    questions: 28,
    difficulty: "Advanced",
    participants: "5.8K",
    passRate: "58%",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Python, SQL, Machine Learning, Statistics",
    icon: Brain,
    duration: "45 min",
    questions: 32,
    difficulty: "Advanced", 
    participants: "9.1K",
    passRate: "62%",
    skills: ["Python", "SQL", "ML Algorithms", "Statistics"]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "Complete web development stack assessment",
    icon: Wrench,
    duration: "50 min",
    questions: 35,
    difficulty: "Expert",
    participants: "4.2K", 
    passRate: "45%",
    skills: ["Frontend", "Backend", "Database", "Deployment"]
  },
  // --- 10 NEW ASSESSMENTS ADDED BELOW ---
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Network security, ethical hacking, and OWASP",
    icon: ShieldCheck,
    duration: "35 min",
    questions: 25,
    difficulty: "Advanced",
    participants: "6.7K",
    passRate: "55%",
    skills: ["Cryptography", "Network Security", "Penetration Testing"]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Native and Cross-platform mobile app development",
    icon: Smartphone,
    duration: "30 min",
    questions: 25,
    difficulty: "Intermediate",
    participants: "7.3K",
    passRate: "70%",
    skills: ["React Native", "Swift/Kotlin", "Flutter", "Mobile UI"]
  },
  {
    id: "typescript",
    title: "TypeScript Mastery",
    description: "Static typing, generics, and advanced TS patterns",
    icon: Binary,
    duration: "25 min",
    questions: 20,
    difficulty: "Intermediate",
    participants: "10.1K",
    passRate: "82%",
    skills: ["Type Safety", "Generics", "Interfaces", "Decorators"]
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "AWS, Azure, and GCP architecture and services",
    icon: Zap,
    duration: "40 min",
    questions: 30,
    difficulty: "Advanced",
    participants: "4.9K",
    passRate: "60%",
    skills: ["SaaS/PaaS", "S3/EC2", "IAM", "Serverless"]
  },
  {
    id: "testing",
    title: "Software Testing",
    description: "Unit, Integration, and E2E testing strategies",
    icon: ListChecks,
    duration: "30 min",
    questions: 25,
    difficulty: "Intermediate",
    participants: "5.2K",
    passRate: "74%",
    skills: ["Jest", "Cypress", "TDD", "QA Automation"]
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "User research, wireframing, and design principles",
    icon: Palette,
    duration: "30 min",
    questions: 20,
    difficulty: "Beginner",
    participants: "8.8K",
    passRate: "85%",
    skills: ["Figma", "User Flow", "Accessibility", "Color Theory"]
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Neural networks, NLP, and LLM fundamentals",
    icon: Cpu,
    duration: "45 min",
    questions: 30,
    difficulty: "Expert",
    participants: "11.2K",
    passRate: "48%",
    skills: ["Deep Learning", "NLP", "TensorFlow", "PyTorch"]
  },
  {
    id: "git",
    title: "Version Control (Git)",
    description: "Branching strategies, merging, and collaboration",
    icon: GitBranch,
    duration: "20 min",
    questions: 15,
    difficulty: "Beginner",
    participants: "15.4K",
    passRate: "90%",
    skills: ["Git Flow", "Rebase", "Merge Conflicts", "GitHub"]
  },
  {
    id: "blockchain",
    title: "Blockchain Tech",
    description: "Decentralized ledgers, Smart Contracts, and DeFi",
    icon: Box,
    duration: "35 min",
    questions: 25,
    difficulty: "Expert",
    participants: "3.1K",
    passRate: "52%",
    skills: ["Solidity", "Ethereum", "Web3", "Consensus"]
  },
  {
    id: "linux",
    title: "Linux Administration",
    description: "CLI mastery, shell scripting, and sysadmin tasks",
    icon: Terminal,
    duration: "30 min",
    questions: 25,
    difficulty: "Intermediate",
    participants: "6.4K",
    passRate: "68%",
    skills: ["Bash", "Permissions", "SSH", "Cron Jobs"]
  }
]

// Difficulty Color Helper
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Expert": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function AssessmentGrid() {
  const router = useRouter()
  
  // Replace this simulation with your actual Auth state (e.g., from useAuth() or next-auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false) 

  const handleStartAssessment = (id: string) => {
    if (!isLoggedIn) {
      // Redirect to login/register page
      router.push(`/login?redirect=/assessments/${id}`)
    } else {
      // Direct access if logged in
      router.push(`/assessments/${id}`)
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Assessment</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select from our comprehensive skill assessments designed by industry experts
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
            const IconComponent = assessment.icon
            return (
              <Card key={assessment.id} className="glassmorphic hover:scale-105 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-8 h-8 text-primary" />
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Stats Row */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {assessment.participants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {assessment.passRate}
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1">
                    {assessment.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Questions count */}
                  <p className="text-sm text-muted-foreground">
                    {assessment.questions} questions • Pass score: 70%
                  </p>

                  {/* Logic Button - Replaced <Link> to control navigation */}
                  <Button 
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="w-full glassmorphic-button-primary group-hover:scale-105 transition-transform"
                  >
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}