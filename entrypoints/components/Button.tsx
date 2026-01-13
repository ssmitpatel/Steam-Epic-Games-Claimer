import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    variant = 'primary',
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 active:translate-y-px";

    const variants = {
        primary: "bg-zinc-100 hover:bg-white text-black", // High contrast white on black
        secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
        danger: "bg-red-900/20 hover:bg-red-900/40 text-red-400",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {children}
        </button>
    );
};
