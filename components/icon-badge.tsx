import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                "default": "bg-[#D1E3EE]",
                "success": "bg-emerald-100 text-white",
            },
            bgSize: {
                "default": "p-2",
            }
        },
        defaultVariants: {
            variant: "default",
            bgSize: "default",
        }
    });

const iconVariants = cva(
    "text-xl",
    {
        variants: {
            variant: {
                "default": "text-sky-700",
                "success": "text-emerald-700",
            },
            size: {
                "default": "h-8 w-8",
                "sm": "h-4 w-4",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    });

type BackgroundProps = VariantProps<typeof backgroundVariants>;
type IconProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundProps, IconProps {
    icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size, bgSize }: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({ variant, bgSize }))}>
            <Icon
                className={cn(iconVariants({ variant, size }))}
            />
        </div>
    );
}
