"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormMessage,
    FormItem, FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const createPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/training", values);
            router.push(`/admin/training/${response.data.id}`);
            toast.success("Training created successfully!");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex h-full p-6">
            <div>
                <h1 className="text-2xl">Name your training</h1>
                <p className="text-gray-500">
                    Give your training a title so everyone knows what it&apos;s about. Don&apos;t worry, you can change it later!
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isSubmitting}
                                            placeholder={"e.g. 'Introduction to Mentoring Area'"}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the visible title of your training.
                                    </FormDescription>
                                    <FormMessage {...field} />
                                </FormItem>
                            )} />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    className="flex items-center gap-x-2 bg-white border-2 border-white text-[#A4B2BC] text-sm font-[500] pl-3 pr-3 transition-colors duration-200 ease-in-out"
                                >
                                    <span>Cancel</span>
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={!isValid || isSubmitting}
                                className="flex items-center gap-x-2 bg-[#2D9CDB] text-white text-sm font-[500] pl-3 pr-3 transition-colors duration-200 ease-in-out"
                            >
                                {isLoading ? (
                                    <div className="bg-background/75 absolute top-0 h-full w-full left-0 flex items-center justify-center">
                                        <BiLoader className="animate-spin w-6 h-6 md:w-10 md:h-10 text-Sou" />
                                    </div>
                                ) : (
                                    <span>Create</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default createPage;
