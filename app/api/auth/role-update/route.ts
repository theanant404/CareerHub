import { NextResponse } from "next/server";
import dbConnect from "@/db/mongoDb";
import UserModel from "@/models/User.Model";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, role } = body as { email?: string; role?: "user" | "company" };

        if (!email || !role) {
            return NextResponse.json(
                { success: false, message: "Email and role are required" },
                { status: 400 }
            );
        }

        if (!["user", "company"].includes(role)) {
            return NextResponse.json(
                { success: false, message: "Invalid role" },
                { status: 400 }
            );
        }

        await dbConnect();
        const normalizedEmail = email.toLowerCase().trim();

        const result = await UserModel.updateOne(
            { email: normalizedEmail },
            { $set: { role } }
        );

        if (result.modifiedCount === 0 && result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: `Role updated to ${role}` });
    } catch (error) {
        console.error("Role update error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update role. Please try again." },
            { status: 500 }
        );
    }
}
