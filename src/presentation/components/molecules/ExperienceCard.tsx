"use client";

import { motion } from "framer-motion";
import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { TechnologyIcon } from "@/presentation/components/atoms/TechnologyIcon";
import type { ExperienceViewModel } from "@/presentation/view-models/homeViewModel";

type ExperienceCardProps = {
  experience: ExperienceViewModel;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.article
      className="rounded-3xl border border-foreground/10 bg-background/80 p-6 shadow-sm backdrop-blur"
      whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Heading as={3} className="text-xl">
            {experience.role}
          </Heading>
          <Text variant="muted" className="mt-1 space-x-2">
            <span>{experience.company}</span>
            {experience.location && <span>· {experience.location}</span>}
            {experience.website && (
              <a
                href={experience.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wide underline underline-offset-4 transition-colors"
                style={{ color: "var(--link-color)" }}
              >
                Sitio
              </a>
            )}
          </Text>
        </div>
        <Text variant="caption">{experience.period}</Text>
      </div>

      {experience.description && (
        <Text className="mt-4">{experience.description}</Text>
      )}

      {experience.highlights.length > 0 && (
        <ul className="mt-6 space-y-3">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-foreground/60" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {experience.techStack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <Badge key={tech.name} tone="accent" className="flex items-center gap-2">
              <TechnologyIcon name={tech.name} iconName={tech.iconName} size="sm" />
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>
      )}
    </motion.article>
  );
}


