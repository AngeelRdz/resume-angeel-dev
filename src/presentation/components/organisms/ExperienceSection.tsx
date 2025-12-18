"use client";

import { motion } from "framer-motion";
import { Heading } from "@/presentation/components/atoms/Heading";
import { ExperienceCard } from "@/presentation/components/molecules/ExperienceCard";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type ExperienceSectionProps = {
  data: HomeViewModel["experience"];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function ExperienceSection({ data }: ExperienceSectionProps) {
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
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {data.items.map((experience) => (
          <motion.div key={experience.id} variants={itemVariants}>
            <ExperienceCard experience={experience} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}


