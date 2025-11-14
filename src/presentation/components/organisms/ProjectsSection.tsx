import { Heading } from "@/presentation/components/atoms/Heading";
import { ProjectCard } from "@/presentation/components/molecules/ProjectCard";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type ProjectsSectionProps = {
  data: HomeViewModel["projects"];
};

export function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <section className="space-y-8 rounded-4xl border border-foreground/10 bg-background/80 p-10 shadow-sm">
      <Heading as={2}>{data.title}</Heading>
      <div className="grid gap-6 lg:grid-cols-3">
        {data.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}


