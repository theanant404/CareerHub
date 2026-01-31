import { z } from "zod"

// Zod validation schema for signup
export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type SignupFormData = z.infer<typeof signupSchema>

// Company signup schema
export const companySignupSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    website: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    industry: z.string().min(1, "Industry is required"),
    size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type CompanySignupFormData = z.infer<typeof companySignupSchema>

// Job posting schema
export const jobPostingSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
    location: z.string().min(1, "Location is required"),
    type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
    remote: z.boolean(),
    salary: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        currency: z.string().default('USD'),
    }).optional(),
    skills: z.array(z.string()),
    experience: z.string().min(1, "Experience level is required"),
})

export type JobPostingFormData = z.infer<typeof jobPostingSchema>

// Company profile basic info schema
export const companyProfileSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    tagline: z.string().min(2, "Tagline is required"),
    industry: z.string().min(1, "Industry is required"),
    size: z.string().min(1, "Size is required"),
    companyType: z.string().min(1, "Company type is required"),
    registrationNumber: z.string().optional().nullable(),
    gstPan: z.string().optional().nullable(),
    emailDomain: z.string().min(3, "Email domain is required"),
    website: z.string().optional().nullable(),
    foundingYear: z.number().int().min(1800).max(new Date().getFullYear()),
    logoUrl: z.string().url().optional().nullable(),
    about: z.string().min(10, "About section must be at least 10 characters"),
    headquarters: z.string().min(2, "Headquarters is required"),
})

export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>
