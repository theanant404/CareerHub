import { NextResponse } from "next/server"
import { z } from "zod"
import { signupSchema, type SignupFormData } from "@/lib/validations/auth"
import dbConnect from "@/db/mongoDb"
import UserModel from "@/models/User.Model"
import bcrypt from "bcryptjs"
import { createAndStoreOTP } from "@/lib/services/otp"
import { sendEmail } from "@/lib/email/send.email"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const validatedData = signupSchema.parse(data as SignupFormData)
        const { name, email, password } = validatedData

        await dbConnect()

        const existingUser = await UserModel.findOne({ email })

        if (existingUser && existingUser.isVarified) {
            return NextResponse.json({ success: false, error: "User already exists with this email" }, { status: 400 })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUser && !existingUser.isVarified) {
            await UserModel.findByIdAndUpdate(existingUser._id, {
                name,
                password: await bcrypt.hash(password, 10),
            })
        } else {
            const username = email.split("@")[0] + Math.floor(1000 + Math.random() * 9000)
            const newUser = new UserModel({
                name,
                username,
                email,
                password: await bcrypt.hash(password, 10),
                isVarified: false,
            })
            await newUser.save()
        }

        const setOtp = await createAndStoreOTP(email, Number(verifyCode), 6, 15 * 60)
        if (!setOtp) {
            return NextResponse.json({ success: false, error: "Failed to generate verification code. Please try again." }, { status: 500 })
        }

        const emailResult = await sendEmail({
            to: email,
            subject: "Verify your CareerHub Account",
            text: `Your verification code is: ${verifyCode}. This code will expire in 15 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Verification</h2>
                    <p>Hello ${name},</p>
                    <p>Thank you for registering with CareerHub. Please verify your email address using the code below:</p>
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
                        <h1 style="color: #333; letter-spacing: 5px;">${verifyCode}</h1>
                    </div>
                    <p>This code will expire in 15 minutes.</p>
                    <p>If you didn't register for this account, please ignore this email.</p>
                    <p>Best regards,<br>CareerHub Team</p>
                </div>
            `,
        })

        if (!emailResult.success) {
            console.error("Failed to send verification email:", emailResult.error)
            return NextResponse.json({
                success: true,
                message: "User registered successfully, but failed to send verification email. Please try again or contact support.",
            })
        }

        return NextResponse.json({ success: true, message: "User registered successfully. Please check your email to verify your account." })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 })
        }
        console.error("Signup error:", error)
        return NextResponse.json({ success: false, error: "Failed to create account. Please try again." }, { status: 500 })
    }
}
