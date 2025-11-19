'use client';

import { useMemo } from "react";

import type { Profile } from "@/core/domain/entities/profile";
import { Navigation } from "@/presentation/components/organisms/Navigation";
import { HeroSection } from "@/presentation/components/organisms/HeroSection";
import { AboutSection } from "@/presentation/components/organisms/AboutSection";
import { ExperienceSection } from "@/presentation/components/organisms/ExperienceSection";
import { SkillsSection } from "@/presentation/components/organisms/SkillsSection";
import { ProjectsSection } from "@/presentation/components/organisms/ProjectsSection";
import { ContactSection } from "@/presentation/components/organisms/ContactSection";
import { useI18n } from "@/presentation/hooks/useTranslation";
import { createHomeViewModel } from "@/presentation/view-models/homeViewModel";

type HomeTemplateProps = {
  profile: Profile;
};

export function HomeTemplate({ profile }: HomeTemplateProps) {
  const { t, i18n } = useI18n();

  const viewModel = useMemo(
    () => createHomeViewModel({ profile, t, language: i18n.language }),
    [profile, t, i18n.language],
  );

  return (
    <>
      <Navigation />
      <div className="w-full">
        <HeroSection data={viewModel.hero} />
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-12 sm:py-16">
          <main className="flex flex-col gap-12">
            <section id="about">
              <AboutSection data={viewModel.about} />
            </section>
            <section id="experience">
              <ExperienceSection data={viewModel.experience} />
            </section>
            <section id="skills">
              <SkillsSection data={viewModel.skills} />
            </section>
            {viewModel.projects.items.length > 0 && (
              <section id="projects">
                <ProjectsSection data={viewModel.projects} />
              </section>
            )}
            <section id="contact">
              <ContactSection data={viewModel.contact} />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}


