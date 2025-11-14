import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import type { ProjectViewModel } from "@/presentation/view-models/homeViewModel";

type ProjectCardProps = {
  project: ProjectViewModel;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-3xl border border-foreground/10 bg-background/80 p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <Text variant="caption" className="uppercase tracking-wide text-foreground/60">
        {project.company}
      </Text>
      <Heading as={3} className="text-xl">
        {project.name}
      </Heading>
      {project.description && (
        <Text variant="muted" className="mt-2">
          {project.description}
        </Text>
      )}
      {project.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-foreground/70">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-foreground/20 px-3 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {project.url && (
        <Text variant="small" className="mt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70"
          >
            {project.url.replace(/^https?:\/\//, "")}
          </a>
        </Text>
      )}
    </article>
  );
}

