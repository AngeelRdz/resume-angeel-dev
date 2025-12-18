"use client";

import { motion } from "framer-motion";
import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { TechnologyIcon } from "@/presentation/components/atoms/TechnologyIcon";
import type { ProjectViewModel } from "@/presentation/view-models/homeViewModel";

type ProjectCardProps = {
  project: ProjectViewModel;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="group rounded-3xl border border-foreground/10 bg-background/80 p-6"
      whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
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
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech.name} tone="accent" className="flex items-center gap-2">
              <TechnologyIcon name={tech.name} iconName={tech.iconName} size="sm" />
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>
      )}
      {project.url && (
        <Text variant="small" className="mt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition-colors"
            style={{ color: "var(--link-color)" }}
          >
            {project.url.replace(/^https?:\/\//, "")}
          </a>
        </Text>
      )}
    </motion.article>
  );
}

