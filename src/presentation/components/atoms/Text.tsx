import type { JSX, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type TextVariant = "body" | "muted" | "small" | "caption";

const variantStyles: Record<TextVariant, string> = {
  body: "text-base leading-relaxed text-foreground/90",
  muted: "text-base leading-relaxed text-foreground/60",
  small: "text-sm leading-relaxed text-foreground/80",
  caption: "text-xs uppercase tracking-wide text-foreground/60",
};

type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
};

export function Text({
  as: Component = "p",
  variant = "body",
  className,
  children,
}: TextProps) {
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}


