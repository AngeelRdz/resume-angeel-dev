"use client";

import { motion } from "framer-motion";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { SkillGroup } from "@/presentation/components/molecules/SkillGroup";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type SkillsSectionProps = {
  data: HomeViewModel["skills"];
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

export function SkillsSection({ data }: SkillsSectionProps) {
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
        <motion.div variants={itemVariants}>
          <SkillGroup
            title={data.primaryTitle}
            description={data.primaryDescription}
            items={data.primarySkills}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SkillGroup
            title={data.complementaryTitle}
            description={data.complementaryDescription}
            items={data.complementarySkills}
          />
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-foreground/10 p-6"
        >
          <Heading as={4}>{data.valuesTitle}</Heading>
          {Array.isArray(data.values) && data.values.length > 0 && (
            <ul className="mt-4 space-y-3">
              {data.values.map((value) => (
                <li key={value}>
                  <Text variant="small">{value}</Text>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}


