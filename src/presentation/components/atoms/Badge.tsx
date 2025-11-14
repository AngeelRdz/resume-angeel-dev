import { cn } from "@/shared/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "success";
};

const toneStyles: Record<Required<BadgeProps>["tone"], string> = {
  neutral: "bg-foreground/10 text-foreground",
  accent: "bg-blue-500/15 text-blue-500",
  success: "bg-emerald-500/15 text-emerald-500",
};

export function Badge({
  children,
  className,
  tone = "neutral",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}


