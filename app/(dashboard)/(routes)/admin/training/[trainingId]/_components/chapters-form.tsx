"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { Suspense, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { db } from '@/lib/db';
import { RiVideoAddFill } from "react-icons/ri";
import { BiLoader } from "react-icons/bi";
import {Training, Chapter} from "@prisma/client";

interface ChapterFormProps {
    initialData: Training & { chapters: Chapter[] };
    trainingId: string;
}
const formSchema = z.object({
    title: z.string().min(1),
});

const ChaptersForm = ({ initialData, trainingId }: ChapterFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();
    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            await axios.post(`/api/training/${trainingId}/chapters`, values);
            toast.success("Módulo criado com sucesso!");
            toggleCreating();
            router.refresh();
        } catch (error) {
            toast.error("Falha ao criar módulo!");
        }
    };
    const onEdit = (id: string) => {
        router.push(`/admin/training/${trainingId}/chapters/${id}`);
    };
    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            setIsUpdating(true);

            await axios.put(`/api/training/${trainingId}/chapters/reorder`, {
                list: updateData,
            });

            toast.success("Chapters reordered");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4 relative overflow-hidden">
            {isUpdating && (
                <div className="bg-background/75 absolute top-0 h-full w-full left-0 flex items-center justify-center">
                    <BiLoader className="animate-spin w-6 h-6 md:w-10 md:h-10" />
                </div>
            )}
            <div className="font-medium text-lg flex items-start justify-between">
        <span>
          Módulo <span className="text-red-500">*</span>
        </span>
                <Button variant={"ghost"} onClick={toggleCreating}>
                    {isCreating ? (
                        <>
                            <MdOutlineCancel className="h-4 w-4 mr-2" />
                            Cancelar
                        </>
                    ) : (
                        <>
                            <RiVideoAddFill className="h-4 w-4 mr-2" />
                            Adicionar
                        </>
                    )}
                </Button>
            </div>

            {isCreating ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-3"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'First Mentoring'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">
                                {!isValid ||
                                    (isSubmitting && <BiLoader className="mr-1 animate-spin" />)}
                                Criar
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={cn(
                        "mt-2 text-sm",
                        !initialData.chapters.length &&
                        "text-muted-foreground italic bg-accent p-4 md:p-6 text-center rounded-lg cursor-not-allowed"
                    )}
                >
                    {!initialData.chapters.length && "Nenhum módulo criado"}
                </div>
            )}

            {!isCreating && (
                <span className="text-xs text-muted-foreground mt-4">
                    Arraste e solte para reordenar módulos
                </span>
            )}
        </div>
    );
};

export default ChaptersForm;
