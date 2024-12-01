import React from "react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiSolidCustomize } from "react-icons/bi";
import { FaEye, FaVideo, FaArrowLeft } from "react-icons/fa";
// import { Banner } from "@/components/ui/banner";
// import ChapterTitleForm from "./_components/ChapterTitleForm";
// import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
// import ChapterAccessFormForm from "./_components/ChapterAccessForm";
// import ChapterVideoForm from "./_components/ChapterVideoForm";
// import ChapterActions from "./_components/ChapterActions";

const page = async ({params}: {params: { trainingId: string; chapterId: string };}) => {
    const { userId } = await auth();
    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            trainingId: params.trainingId,
        },
    });
    if (!chapter) {
        return redirect("/");
    }

    const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {/*{!chapter.isPublished && (*/}
            {/*    <Banner*/}
            {/*        variant="warning"*/}
            {/*        label="Este módulo não está publicado. Ele não será visível"*/}
            {/*    />*/}
            {/*)}*/}
            <div className="container p-6">
                <div className="flex flex-col justify-center gap-0">
                    <div className="w-full">
                        <Link
                            href={`/admin/training/${params.trainingId}`}
                            className="inline-flex items-center text-sm hover:opacity-75 transition mb-4 hover:bg-accent py-1 px-3 rounded-full w-auto"
                        >
                            <FaArrowLeft className="h-4 w-4" />
                            Voltar
                        </Link>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">Criar módulo</h1>
                                <span className="text-sm text-muted-foreground">
                                    Complete todos os campos {completionText}
                                 </span>
                            </div>
                            {/*<ChapterActions*/}
                            {/*    disabled={!isComplete}*/}
                            {/*    trainingId={params.trainingId}*/}
                            {/*    chapterId={params.chapterId}*/}
                            {/*    isPublished={chapter.isPublished}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
                {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">*/}
                {/*    <div className="space-y-4">*/}
                {/*        <div className="flex items-center gap-x-2">*/}
                {/*            <BiSolidCustomize className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />*/}
                {/*            <h2 className="text-xl">Personalize seu módulo</h2>*/}
                {/*        </div>*/}
                {/*        <ChapterTitleForm*/}
                {/*            initialData={chapter}*/}
                {/*            trainingId={params.trainingId}*/}
                {/*            chapterId={params.chapterId}*/}
                {/*        />*/}
                {/*        <ChapterDescriptionForm*/}
                {/*            initialData={chapter}*/}
                {/*            trainingId={params.trainingId}*/}
                {/*            chapterId={params.chapterId}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="space-y-4">*/}
                {/*        <div className="flex items-center gap-x-2">*/}
                {/*            <FaEye className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />*/}
                {/*            <h2 className="text-xl">Configurações de acesso</h2>*/}
                {/*        </div>*/}
                {/*        <ChapterAccessFormForm*/}
                {/*            initialData={chapter}*/}
                {/*            trainingId={params.trainingId}*/}
                {/*            chapterId={params.chapterId}*/}
                {/*        />*/}
                {/*        <div className="flex items-center gap-x-2">*/}
                {/*            <FaVideo className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />*/}
                {/*            <h2 className="text-xl">Adicionar vídeo</h2>*/}
                {/*        </div>*/}
                {/*        <ChapterVideoForm*/}
                {/*            initialData={chapter}*/}
                {/*            chapterId={params.chapterId}*/}
                {/*            trainingId={params.trainingId}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default page;
