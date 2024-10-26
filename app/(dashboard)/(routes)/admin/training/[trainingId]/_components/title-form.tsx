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
    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`/api/training/${trainingId}`, values);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-6 border border-[#F1F1F1] bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                <h3 className="text-lg">Title</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    type="submit"
                    form="title-form"
                    disabled={!isValid || isSubmitting}
                >
                    <FaPencil size={16} />
                    Edit title
                </Button>
            </div>
        </div>
    )
}

