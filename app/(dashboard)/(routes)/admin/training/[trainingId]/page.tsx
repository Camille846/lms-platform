import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import {redirect} from "next/navigation";
import {LayoutDashboard} from "lucide-react";
import {IconBadge} from "@/components/icon-badge";
import {TitleForm} from "./_components/title-form";
import {DescriptionForm} from "./_components/description-form";
import {Description} from "@radix-ui/react-dialog";
import Image from "next/image";
import ImageForm from "@/app/(dashboard)/(routes)/admin/training/[trainingId]/_components/image-form";
import CategoryForm from "@/app/(dashboard)/(routes)/admin/training/[trainingId]/_components/category-form";

const TrainingIdPage = async ({
    params
} : {
    params: { trainingId: string }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect('/');
    }

    const training = await db.training.findUnique({
        where: {
            id: params.trainingId,
        },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} size="sm" />
                        <h2 className="text-xl font-medium text-SoulBlue">Customize seu Training</h2>
                    </div>
                    <TitleForm
                        initialData={training}
                        trainingId={training.id}
                    />
                    <DescriptionForm
                        initialData={{ ...training, description: training.description || '' }}
                        trainingId={training.id}
                    />
                    <ImageForm initialData={training} trainingId={training.id} />
                    <CategoryForm
                        initialData={training}
                        trainingId={training.id}
                        options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))} />
                </div>
            </div>
        </div>
    );
}

export default TrainingIdPage;
