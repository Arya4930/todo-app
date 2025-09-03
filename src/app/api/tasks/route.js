import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/Users";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request) {
    try {
        await connectDB()
        const { tasks } = await request.json();
        const session = await getServerSession(options);
        if(!session) {
            return NextResponse.json({ message: "User not logged in"}, { status: 401});
        }

        const user = await User.findOne({ email: session?.user?.email });
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        user.tasks = tasks;
        await user.save();

        return NextResponse.json({ message: "Tasks updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating tasks:", error);
        return NextResponse.json({ error: "Failed to update tasks" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB()

        const session = await getServerSession(options);
        if(!session) {
            return NextResponse.json({ message: "User not logged in"}, { status: 401});
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