import { Heading } from "@/presentation/components/atoms/Heading";
import { ExperienceCard } from "@/presentation/components/molecules/ExperienceCard";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type ExperienceSectionProps = {
  data: HomeViewModel["experience"];
};

export function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section className="space-y-8 rounded-4xl border border-foreground/10 bg-background/80 p-10 shadow-sm">
      <Heading as={2}>{data.title}</Heading>
      <div className="space-y-6">
        {data.items.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}


