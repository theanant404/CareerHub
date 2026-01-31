import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/db/mongoDb";
import { JobModel, CompanyModel } from "@/models/company/profile/CompanyBasicInfo.Model";
import { jobPostingSchema } from "@/lib/validations/auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const companyId = searchParams.get('companyId');

        if (companyId) {
            const jobs = await JobModel.find({ companyId }).populate('companyId', 'name logo');
            return NextResponse.json({ jobs });
        }

        const jobs = await JobModel.find({ isActive: true }).populate('companyId', 'name logo');
        return NextResponse.json({ jobs });

    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const company = await CompanyModel.findOne({ email: session.user.email });
        if (!company) {
            return NextResponse.json({ message: "Company not found" }, { status: 404 });
        }

        const body = await request.json();
        const validatedData = jobPostingSchema.parse(body);

        const job = await JobModel.create({
            ...validatedData,
            companyId: company._id,
        });

        return NextResponse.json({
            message: "Job posted successfully",
            job
        }, { status: 201 });

    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
    }
}