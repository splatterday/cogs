"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// A simple helper to join class names; you can replace this with your own or use clsx
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                "bg-primary-light dark:bg-primary-dark text-text hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 font-semibold py-2 px-4 rounded-lg shadow-md transition-all",
                destructive:
                "bg-danger text-white hover:bg-danger/90 font-semibold py-2 px-4 rounded-lg shadow-md transition-all",
                outline:
                "border border-gray-300 dark:border-gray-600 text-primary-light dark:text-primary-dark hover:bg-highlight-light dark:hover:bg-highlight-dark font-semibold py-2 px-4 rounded-lg transition-all",
                pagination:
                "bg-secondary text-black hover:bg-secondary/90 px-3 py-1 rounded transition-all",
                subtle:
                "bg-secondary text-text-light dark:text-text-dark hover:bg-secondary/90 font-semibold py-2 px-4 rounded-lg transition-all",
                ghost:
                "bg-transparent text-primary-light dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                link:
                "underline-offset-4 hover:underline text-primary-light dark:text-primary-dark transition-all",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-md",
                lg: "h-11 px-8 rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
