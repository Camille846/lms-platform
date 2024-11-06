import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import {redirect} from "next/navigation";
import {LayoutDashboard} from "lucide-react";
import {IconBadge} from "@/components/icon-badge";
import {TitleForm} from "./_components/title-form";
import {DescriptionForm} from "./_components/description-form";
import {Description} from "@radix-ui/react-dialog";
import Image from "next/image";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import {FaListCheck} from "react-icons/fa6";
import ChaptersForm from "./_components/chapters-form";

const TrainingIdPage = async ({
    params
} : {
    params: { trainingId: string }
}) => {
    params = await params
    const { userId } = await auth();
    if (!userId) {
        return redirect('/');
    }

    console.log(userId)
    const training = await db.training.findUnique({
        where: {
            id: params.trainingId,
        },
        include: {
            chapters: true,
        }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    if(!training) {
        return redirect('/admin/modules');
    }

    const requiredFields = [
        training.title,
        training.description,
        training.imageUrl,
        training.categoryId,
        training.chapters.some((chapter) => chapter.isPublished),
    ];

    // Se algum campo não existir, ele retorna como false e não é contabilizado
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields} of ${totalFields})`;

    return (
        <div className={'p-6'}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Vamos criar um novo Training!</h1>
                    <span className="text-gray-500 text-sm">Complete todos os campos {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-6 w-full">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} size="sm"/>
                        <h2 className="text-xl font-medium text-SoulBlue">Customize seu Training</h2>
                    </div>
                    <TitleForm
                        initialData={training}
                        trainingId={training.id}
                    />
                    <DescriptionForm
                        initialData={{...training, description: training.description || ''}}
                        trainingId={training.id}
                    />
                    <ImageForm initialData={training} trainingId={training.id}/>
                    <CategoryForm
                        initialData={training}
                        trainingId={training.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}/>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2 rounded-2xl">
                        <div className="text-lg flex gap-2 items-center">
                            <span className="bg-[#D1E3EE] p-2 rounded-2xl">
                                <FaListCheck className="h-4 w-4 text-sky-700"/>
                            </span>
                        </div>
                        <h2 className="text-xl text-SoulBlue font-medium">Módulos</h2>
                    </div>
                    <ChaptersForm initialData={training} trainingId={training.id}/>
                </div>
            </div>
        </div>
    );
}

export default TrainingIdPage;
