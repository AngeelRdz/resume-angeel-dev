import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { SkillGroup } from "@/presentation/components/molecules/SkillGroup";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type SkillsSectionProps = {
  data: HomeViewModel["skills"];
};

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section className="space-y-8 rounded-4xl border border-foreground/10 bg-background/80 p-10 shadow-sm">
      <Heading as={2}>{data.title}</Heading>
      <div className="grid gap-6 lg:grid-cols-3">
        <SkillGroup
          title={data.primaryTitle}
          description={data.primaryDescription}
          items={data.primarySkills}
        />
        <SkillGroup
          title={data.complementaryTitle}
          description={data.complementaryDescription}
          items={data.complementarySkills}
        />
        <div className="rounded-3xl border border-foreground/10 p-6">
          <Heading as={4}>{data.valuesTitle}</Heading>
          <ul className="mt-4 space-y-3">
            {data.values.map((value) => (
              <li key={value}>
                <Text variant="small">{value}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


