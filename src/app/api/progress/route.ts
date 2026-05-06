import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import UserProgress from "@/models/UserProgress";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId") || "guest_user";

        await connectToDatabase();

        let progress = await UserProgress.findOne({ userId });

        if (!progress) {
            // Create initial progress if it doesn't exist
            progress = await UserProgress.create({
                userId,
                completedNodes: [],
                unlockedDomains: ["web", "android", "unity", "ai"], // Unlocking all for MVP presentation
            });
        } else {
            // For MVP: Force existing users to have all domains unlocked if they don't already
            const requiredDomains = ["web", "android", "unity", "ai"];
            let modified = false;
            requiredDomains.forEach(domain => {
                if (!progress.unlockedDomains.includes(domain)) {
                    progress.unlockedDomains.push(domain);
                    modified = true;
                }
            });
            if (modified) {
                await progress.save();
            }
        }

        return NextResponse.json(progress);
    } catch (error) {
        console.error("GET Progress Error:", error);
        return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId = "guest_user", completedNodeId, unlockDomainId } = body;

        await connectToDatabase();

        let progress = await UserProgress.findOne({ userId });
        if (!progress) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (completedNodeId && !progress.completedNodes.includes(completedNodeId)) {
            progress.completedNodes.push(completedNodeId);
        }

        if (unlockDomainId && !progress.unlockedDomains.includes(unlockDomainId)) {
            progress.unlockedDomains.push(unlockDomainId);
        }

        await progress.save();
        return NextResponse.json(progress);
    } catch (error) {
        console.error("POST Progress Error:", error);
        return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
    }
}
