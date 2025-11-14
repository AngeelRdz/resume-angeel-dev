import { cn } from "@/shared/utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

const styles: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl font-bold tracking-tight",
  2: "text-3xl sm:text-4xl font-semibold tracking-tight",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base font-medium uppercase tracking-wide",
};

const alignStyles: Record<Required<HeadingProps>["align"], string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

export function Heading({
  as = 2,
  children,
  className,
  align = "left",
}: HeadingProps) {
  const Tag = `h${as}` as const;

  return (
    <Tag className={cn(styles[as], alignStyles[align], className)}>
      {children}
    </Tag>
  );
}


