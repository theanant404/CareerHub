import mongoose, { Schema, Document } from "mongoose";

export interface Company extends Document {
    name: string;
    email: string;
    password?: string;
    logo?: string;
    tagline?: string;
    description?: string;
    website?: string;
    location?: string;
    headquarters?: string;
    industry?: string;
    size?: string;
    registrationNumber?: string;
    gstPan?: string;
    emailDomain?: string;
    foundingYear?: number;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Job extends Document {
    companyId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    remote: boolean;
    salary?: {
        min?: number;
        max?: number;
        currency: string;
    };
    skills: string[];
    experience: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CompanySchema: Schema<Company> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    logo: { type: String },
    tagline: { type: String },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    headquarters: { type: String },
    industry: { type: String },
    size: { type: String, enum: ['1-10', '11-50', '51-200', '201-500', '500+'] },
    registrationNumber: { type: String },
    gstPan: { type: String },
    emailDomain: { type: String },
    foundingYear: { type: Number },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const JobSchema: Schema<Job> = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
    remote: { type: Boolean, default: false },
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' }
    },
    skills: [{ type: String }],
    experience: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const CompanyModel = mongoose.models.Company as mongoose.Model<Company> || mongoose.model<Company>("Company", CompanySchema);
export const JobModel = mongoose.models.Job as mongoose.Model<Job> || mongoose.model<Job>("Job", JobSchema);