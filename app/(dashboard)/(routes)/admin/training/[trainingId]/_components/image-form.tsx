"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Training } from "@prisma/client";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdOutlineImagesearchRoller } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {IoBook} from "react-icons/io5";

interface ImageFormProps {
    initialData: Training;
    trainingId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Imagem é obrigatória",
    }),
});

const ImageForm = ({ initialData, trainingId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/training/${trainingId}`, values);
            toast.success("Imagem atualizada com sucesso");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Falha ao atualizar imagem");
        }
    };

    return (
        <div className="order bg-accent/30 border-2 border-[#F1F1F1] rounded-lg p-4 mt-4">
            <div className="font-medium text-lg flex items-start justify-between gap-10">
                <div className="flex items-center justify-center gap-2">
                    {isSubmitting && <BiLoader className="animate-spin w-5 h-5"/>}
                    <div className="text-lg flex gap-2 items-center">
                        <span className="bg-[#D1E3EE] p-2 rounded-2xl">
                            <IoBook className="h-4 w-4 text-SoulBlue"/>
                        </span>
                    </div>
                    <p className="text-lg font-medium">
                        Imagem
                        <span className="text-red-500">*</span>
                    </p>
                </div>
                <Button
                    variant={"ghost"}
                    onClick={toggleEdit}
                    disabled={isSubmitting}
                    className="text-sm hover:text-[#FFA500] text-[#F45A2B] transition-colors duration-200 ease-in-out"
                >
                    {isEditing && (
                        <>
                            <MdOutlineCancel className="h-4 w-4" />
                            Cancelar
                        </>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <BiSolidImageAdd className="h-4 w-4"/>
                            Adicionar
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <MdOutlineImagesearchRoller className="h-4 w-4"/>
                            Editar
                        </>
                    )}
                </Button>
            </div>
            {isEditing && (
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 xl:space-y-0 mt-3 xl:flex xl:gap-2 xl:w-full xl:justify-start xl:items-start"
                        >
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="https://images.com/imageUrl"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                    variant="default"
                                >
                                    {!isValid ||
                                        (isSubmitting && (
                                            <BiLoader className="mr-1 animate-spin" />
                                        ))
                                    }
                                    Salvar alterações
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <span className="text-xs text-muted-foreground mt-4">
                        Proporção de aspecto 16:9 recomendada
                    </span>
                </div>
            )}
            {!isEditing && initialData.imageUrl && (
                <div className="relative aspect-video mt-2 h-60 max-w-sm">
                    <img
                        src={initialData.imageUrl}
                        alt="Training Image"
                        className="rounded-xl object-cover object-center w-full h-full"
                    />
                </div>
            )}
            {!isEditing && !initialData.imageUrl && (
                <div className="flex items-center justify-center h-60 bg-accent rounded-xl mt-2 cursor-not-allowed">
                    <FaImage className="h-10 w-10 text-muted-foreground" />
                </div>
            )}
        </div>
    );
};

export default ImageForm;
