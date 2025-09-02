import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET() {
    try {
        await connectDB()

        const session = await getServerSession(options);
        if(!session) {
            return NextResponse({ message: "User not logged in"}, { status: 401});
        }

        const user = await User.findOne({ email: session?.user?.email });
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ tasks: user.tasks }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}