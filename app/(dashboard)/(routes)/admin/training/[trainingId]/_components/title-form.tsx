"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {FaPencil} from "react-icons/fa6";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    trainingId: string;
}

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required", }),
});

export const TitleForm = ({ initialData, trainingId } : TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/training/${trainingId}`, values);
            toast.success("Title updated");
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast.error("Failed to update title");
            console.error(error);
        }
    }

    return (
        <div className="mt-6 border border-[#F1F1F1] bg-slate-100 rounded-md p-4 w-full">
            <div className="flex items-center justify-between font-medium">
                <h3 className="text-lg">Title</h3>
                <Button
                    onClick={toggleEditing}
                    variant="ghost"
                    size="sm"
                    form="title-form"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <FaPencil className="h-4 w-4" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="title-form" className="mt-4 space-y-4">
                        <FormField
                            name={"title"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. 'How to plan a mentoring session'"
                                            type="text"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="mt-2">
                    <p>{initialData.title}</p>
                </div>
            )}
        </div>
    )
}

