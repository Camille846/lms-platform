import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import db from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { trainingId: string, chapterId: string } }
) {
    try {
        const { userId } = await auth()
        const { title } = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const ownCourse = await db.training.findUnique({
            where: {
                id: params.trainingId,
                userId: userId
            },
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const lastChapter = await db.chapter.findFirst({
            where: {
                trainingId: params.trainingId,
            },
            orderBy: {
                position: 'desc',
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                trainingId: params.trainingId,
                position: newPosition,
                isPublished: false,
            }
        })
        return NextResponse.json(chapter);
    } catch (error) {
        console.log("[COURSES_CHAPTER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
