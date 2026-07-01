"use client";

import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `duolingo-btn font-body font-semibold${props.disabled ? "" : " cursor-pointer"}`;

  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    success: "btn-success",
    outline: "btn-outline",
    ghost: "btn-ghost",
    white: "btn-white",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
    md: "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-5 py-3 text-sm sm:px-8 sm:py-4 sm:text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}