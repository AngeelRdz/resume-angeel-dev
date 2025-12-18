"use client";

import { motion } from "framer-motion";
import { Heading } from "@/presentation/components/atoms/Heading";
import { ProjectCard } from "@/presentation/components/molecules/ProjectCard";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type ProjectsSectionProps = {
  data: HomeViewModel["projects"];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="space-y-8 rounded-4xl border border-foreground/10 bg-background/80 p-10 shadow-sm"
    >
      <Heading as={2}>{data.title}</Heading>
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {data.items.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}


