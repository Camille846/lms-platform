import {NextResponse} from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST (req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const training = await db.training.create({
            data: {
                title,
                userId
            }
        });
        return NextResponse.json(training);
    } catch (error) {
        console.log("[training]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
