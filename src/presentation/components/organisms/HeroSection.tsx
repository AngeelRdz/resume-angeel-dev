import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { WaveDivider } from "@/presentation/components/atoms/WaveDivider";
import { ActionBar } from "@/presentation/components/molecules/ActionBar";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type HeroSectionProps = {
  data: HomeViewModel["hero"];
};

export function HeroSection({ data }: HeroSectionProps) {

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pt-24 text-primary-foreground transition-colors duration-500 ease-in-out"
        style={{ backgroundColor: "var(--hero-bg)" }}
      >
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                {data.highlights.map((highlight) => (
                  <Badge key={highlight.id} tone="accent" className="bg-primary-foreground/20 text-primary-foreground">
                    {highlight.value}
                  </Badge>
                ))}
              </div>
              <Text variant="small" className="uppercase tracking-wide text-primary-foreground/80">
                {data.greeting}
              </Text>
              <Heading as={1} className="text-5xl sm:text-6xl text-primary-foreground">
                {data.name}
              </Heading>
              <Heading as={3} className="text-2xl text-primary-foreground/90">
                {data.role}
              </Heading>
              <Text className="max-w-2xl text-lg text-primary-foreground/90">
                {data.headline}
              </Text>
              <Text variant="muted" className="text-primary-foreground/80">
                {data.availability}
              </Text>
              <Text variant="small" className="uppercase tracking-wide text-primary-foreground/70">
                {data.location}
              </Text>
            </div>
            <ActionBar actions={data.actions} />
          </div>
        </div>
        <div className="text-background">
          <WaveDivider />
        </div>
      </section>
    </>
  );
}


