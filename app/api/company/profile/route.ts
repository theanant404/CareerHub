import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect from "@/db/mongoDb"
import { CompanyModel } from "@/models/company/profile/CompanyBasicInfo.Model"
import { companyProfileSchema } from "@/lib/validations/auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()
        const body = await request.json()
        const validatedData = companyProfileSchema.parse(body)

        const company = await CompanyModel.findOne({ email: session.user.email })
        if (!company) {
            return NextResponse.json({ message: "Company not found" }, { status: 404 })
        }

        company.name = validatedData.name
        company.tagline = validatedData.tagline
        company.industry = validatedData.industry
        company.size = validatedData.size
        company.registrationNumber = validatedData.registrationNumber
        company.gstPan = validatedData.gstPan
        company.emailDomain = validatedData.emailDomain
        company.foundingYear = validatedData.foundingYear
        company.logo = validatedData.logoUrl || company.logo
        company.description = validatedData.about
        company.headquarters = validatedData.headquarters
        company.location = validatedData.headquarters

        await company.save()

        return NextResponse.json({ message: "Company profile updated", company }, { status: 200 })
    } catch (error: any) {
        if (error?.name === "ZodError") {
            return NextResponse.json({ message: error.errors?.[0]?.message || "Invalid data" }, { status: 400 })
        }
        return NextResponse.json({ message: error?.message || "Failed to update company profile" }, { status: 500 })
    }
}
