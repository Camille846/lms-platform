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
import {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {BiLoader} from "react-icons/bi";
import {MdOutlineCancel} from "react-icons/md";
import {FaPencilAlt} from "react-icons/fa";
import {IoBook} from "react-icons/io5";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";

interface DescriptionFormProps {
    initialData: {
        description: string;
    };
    trainingId: string;
}

const formSchema = z.object({
    description: z.string().min(3, { message: "Description is required and must be at least 3 characters" }),
});

export const DescriptionForm = ({ initialData, trainingId } : DescriptionFormProps) => {
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
            toast.success("Description updated");
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast.error("Failed to update description");
            console.error(error);
        }
    }

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
                        Description
                        <span className="text-red-500">*</span>
                    </p>
                </div>
                <Button variant={"ghost"} onClick={toggleEditing} className="text-sm hover:text-[#FFA500] text-[#F45A2B] transition-colors duration-200 ease-in-out">
                    {isEditing ? (
                        <>
                            <MdOutlineCancel className="h-4 w-4"/>
                            Cancel
                        </>
                    ) : (
                        <>
                            <FaPencilAlt className="h-4 w-4"/>
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2 mt-3"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'This training is about...'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2 mt-4">
                            <Button disabled={!isValid || isSubmitting} type="submit" className="bg-SoulBlue hover:bg-[#F45A2B] hover:text-white mt-4">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="mt-0 text-sm">
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-gray-500 italic"
                    )}>
                        {initialData.description || "No description provided"}
                    </p>
                </div>
            )}
        </div>
    )
}

