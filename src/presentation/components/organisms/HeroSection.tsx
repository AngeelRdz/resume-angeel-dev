import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { ActionBar } from "@/presentation/components/molecules/ActionBar";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type HeroSectionProps = {
  data: HomeViewModel["hero"];
};

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-foreground/10 bg-gradient-to-br from-background via-background to-foreground/10 p-10 shadow-lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            {data.highlights.map((highlight) => (
              <Badge key={highlight.id} tone="accent">
                {highlight.value}
              </Badge>
            ))}
          </div>
          <Text variant="small" className="uppercase tracking-wide">
            {data.greeting}
          </Text>
          <Heading as={1}>{data.name}</Heading>
          <Heading as={3} className="text-2xl text-foreground/80">
            {data.role}
          </Heading>
          <Text className="max-w-2xl text-lg">{data.headline}</Text>
          <Text variant="muted">{data.availability}</Text>
          <Text variant="small" className="uppercase tracking-wide text-foreground/50">
            {data.location}
          </Text>
        </div>
        <ActionBar actions={data.actions} />
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-foreground/10 blur-3xl" />
    </section>
  );
}


