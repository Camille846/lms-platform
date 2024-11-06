import {NextResponse} from "next/server";
import { auth } from '@clerk/nextjs/server';
import { db } from "@/lib/db";

export async function PATCH (
    req: Request,
    { params } : { params: { trainingId: string } }
) {
    try {
        const { userId } = await auth();
        const { trainingId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const training = await db.training.update({
            where: {
                id: trainingId,
                userId
            },
            data: {
                ...values
            }
        })
        return NextResponse.json(training);
    } catch (error) {
        console.error("trainingId", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
