import { Button } from "@/presentation/components/atoms/Button";
import { cn } from "@/shared/utils/cn";
import type { HeroAction } from "@/presentation/view-models/homeViewModel";

type ActionBarProps = {
  actions: HeroAction[];
  className?: string;
};

export function ActionBar({ actions, className }: ActionBarProps) {
  if (!actions.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      {actions.map((action) => (
        <Button
          key={action.label}
          href={action.href}
          variant={action.variant}
          download={action.download}
          className={
            action.variant === "primary"
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-[#2d4a3a] dark:text-white dark:hover:bg-[#2d4a3a]/90"
              : action.variant === "secondary"
                ? "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 dark:border-[#2d4a3a]/50 dark:text-white dark:hover:bg-[#2d4a3a]/20"
                : undefined
          }
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}


