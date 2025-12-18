"use client";

import { motion } from "framer-motion";
import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { WaveDivider } from "@/presentation/components/atoms/WaveDivider";
import { ActionBar } from "@/presentation/components/molecules/ActionBar";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type HeroSectionProps = {
  data: HomeViewModel["hero"];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
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
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col gap-4">
              <motion.div
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {data.highlights.map((highlight) => (
                  <Badge
                    key={highlight.id}
                    tone="accent"
                    className="bg-white/20 text-white"
                  >
                    {highlight.value}
                  </Badge>
                ))}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Text
                  variant="small"
                  className="uppercase tracking-wide text-white/80"
                >
                  {data.greeting}
                </Text>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Heading as={1} className="text-5xl sm:text-6xl text-white">
                  {data.name}
                </Heading>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Heading as={3} className="text-2xl text-white/90">
                  {data.role}
                </Heading>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Text className="max-w-2xl text-lg text-white/90">
                  {data.headline}
                </Text>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Text variant="muted" className="text-white/80">
                  {data.availability}
                </Text>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Text
                  variant="small"
                  className="uppercase tracking-wide text-white/70"
                >
                  {data.location}
                </Text>
              </motion.div>
            </div>
            <motion.div variants={itemVariants}>
              <ActionBar actions={data.actions} />
            </motion.div>
          </motion.div>
        </div>
        <div className="text-background">
          <WaveDivider />
        </div>
      </section>
    </>
  );
}


