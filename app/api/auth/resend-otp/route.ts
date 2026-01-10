import { NextResponse } from "next/server"
import dbConnect from "@/db/mongoDb"
import UserModel from "@/models/User.Model"
import { createAndStoreOTP } from "@/lib/services/otp"
import { sendEmail } from "@/lib/email/send.email"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()
        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
        }

        await dbConnect()
        const user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        if (user.isVarified) {
            return NextResponse.json({ success: false, message: "Email already verified" }, { status: 400 })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const setOtp = await createAndStoreOTP(email, Number(verifyCode), 6, 15 * 60)
        if (!setOtp) {
            return NextResponse.json({ success: false, message: "Failed to generate verification code. Please try again." }, { status: 500 })
        }

        const emailResult = await sendEmail({
            to: email,
            subject: "Verify your CareerHub Account",
            text: `Your verification code is: ${verifyCode}. This code will expire in 15 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Verification</h2>
                    <p>Hello ${user.name},</p>
                    <p>You requested a new verification code. Please use the code below:</p>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
                        <h1 style="color: #333; letter-spacing: 5px;">${verifyCode}</h1>
                    </div>
                    <p>This code will expire in 15 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                    <p>Best regards,<br>CareerHub Team</p>
                </div>
            `,
        })

        if (!emailResult.success) {
            console.error("Failed to send verification email:", emailResult.error)
            return NextResponse.json({ success: false, message: "Failed to send verification email. Please try again." }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: "Verification code resent successfully" })
    } catch (error) {
        console.error("Error resending OTP:", error)
        return NextResponse.json({ success: false, message: "Failed to resend verification code. Please try again." }, { status: 500 })
    }
}
