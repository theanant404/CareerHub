import { NextResponse } from "next/server"
import dbConnect from "@/db/mongoDb"
import UserModel from "@/models/User.Model"
import { verifyOTP } from "@/lib/services/otp"

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json()
        if (!email || !otp) {
            return NextResponse.json({ success: false, message: "Email and OTP are required" }, { status: 400 })
        }

        await dbConnect()

        const isValidOtp = await verifyOTP(email, Number(otp))
        if (!isValidOtp) {
            return NextResponse.json({ success: false, message: "Invalid or expired verification code" }, { status: 400 })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        user.isVarified = true
        await user.save()

        return NextResponse.json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        console.error("Error verifying OTP:", error)
        return NextResponse.json({ success: false, message: "Failed to verify OTP. Please try again." }, { status: 500 })
    }
}
