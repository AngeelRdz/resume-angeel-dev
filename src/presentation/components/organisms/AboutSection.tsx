import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type AboutSectionProps = {
  data: HomeViewModel["about"];
};

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="grid gap-8 rounded-4xl border border-foreground/10 bg-background/80 p-10 shadow-sm sm:grid-cols-[2fr_1fr]">
      <div>
        <Heading as={2}>{data.title}</Heading>
        <Text className="mt-4 text-lg">{data.summary}</Text>
      </div>
      <dl className="grid gap-4">
        {data.highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="rounded-3xl border border-foreground/10 p-4"
          >
            <dt className="text-xs uppercase tracking-wide text-foreground/60">
              {highlight.label}
            </dt>
            <dd className="mt-2 text-sm font-medium text-foreground">
              {highlight.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}


