import { Button } from "@/presentation/components/atoms/Button";
import type { HeroAction } from "@/presentation/view-models/homeViewModel";

type ActionBarProps = {
  actions: HeroAction[];
};

export function ActionBar({ actions }: ActionBarProps) {
  if (!actions.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {actions.map((action) => (
        <Button
          key={action.label}
          href={action.href}
          variant={action.variant}
          download={action.download}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}


