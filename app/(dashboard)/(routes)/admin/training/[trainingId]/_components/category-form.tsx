"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Training } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { IconType } from 'react-icons';
import {MdOutlineCancel, MdOutlineChangeCircle, MdPsychology} from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import {GiPodiumWinner, GiTeacher} from "react-icons/gi";
import {RiKakaoTalkFill} from "react-icons/ri";
import {PiStudentBold} from "react-icons/pi";
import {IoBook} from "react-icons/io5";

interface CategoryFormProps {
    initialData: Training;
    trainingId: string;
    options:{
        value: string
        label: string
    }[],
}

const formSchema = z.object({
    categoryId: z.string().min(1),
});


const IconMap: Record<string, IconType> = {
    "Mentoring": RiKakaoTalkFill,
    "Teaching": GiTeacher,
    "For Ambassadors": GiPodiumWinner,
    "For Students": PiStudentBold,
    "For Counselors": MdPsychology,
};

const CategoryForm = ({ initialData, trainingId, options }: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            await axios.patch(`/api/training/${trainingId}`, values)
            toast.success("Categoria atualizada com sucesso");
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast.error("Falha ao atualizar categoria");
        }
    };

    const selectedOption = options.find((option)=> option.value === initialData.categoryId);

    return (
        <div className="order bg-accent/30 border-2 border-[#F1F1F1] rounded-lg p-4 mt-4">
            <div className="font-medium text-lg flex items-start justify-between gap-10 mb-2">
                <div className="flex items-center justify-center gap-2">
                    {isSubmitting && <BiLoader className="animate-spin w-5 h-5"/>}
                    <div className="text-lg flex gap-2 items-center">
                        <span className="bg-[#D1E3EE] p-2 rounded-2xl">
                            <IoBook className="h-4 w-4 text-SoulBlue"/>
                        </span>
                    </div>
                    <p className="text-lg font-medium">
                        Categoria
                        <span className="text-red-500">*</span>
                    </p>
                </div>
                <Button variant={"ghost"} onClick={toggleEditing} className="text-sm hover:text-[#FFA500] text-[#F45A2B] transition-colors duration-200 ease-in-out">
                    {isEditing ? (
                        <>
                            <MdOutlineCancel className="h-4 w-4"/>
                            Cancelar
                        </>
                    ) : (
                        <>
                            <MdOutlineChangeCircle className="h-4 w-4"/>
                            Alterar
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 gap-2 flex">
                        <FormField control={form.control} name="categoryId" render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Combobox
                                        options={options}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}></FormField>
                        <div className="flex items-center gap-x-2">
                        <Button disabled={!isValid || isSubmitting}
                                    type="submit">
                                Salvar alterações
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <p className={cn("mt-0 text-base flex gap-2 items-center", !initialData.categoryId && "text-muted-foreground italic")}>
                    {selectedOption?.label || "Nenhuma categoria"}
                </p>
            )}
        </div>
    );
};

export default CategoryForm;
