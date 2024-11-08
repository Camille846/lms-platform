import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: { trainingId: string; } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            console.log("[REORDER] Unauthorized: No userId");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { list } = await req.json();

        if (!list || !Array.isArray(list)) {
            console.log("[REORDER] Invalid list format", list);
            return new NextResponse("Bad Request", { status: 400 });
        }

        const ownCourse = await db.training.findUnique({
            where: {
                id: params.trainingId,
                userId: userId
            }
        });

        if (!ownCourse) {
            console.log("[REORDER] Unauthorized: Course not found or does not belong to user");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        for (let item of list) {
            if (!item.id || item.position === undefined) {
                console.log("[REORDER] Invalid item format", item);
                continue;
            }
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            });
        }
        return new NextResponse("Success", { status: 200 });
    } catch (error) {
        console.error("[REORDER] Internal Server Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
