'use client';

import { useMemo } from "react";

import type { Profile } from "@/core/domain/entities/profile";
import { LanguageSwitcher } from "@/presentation/components/molecules/LanguageSwitcher";
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
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-10 px-6 py-12 sm:px-12 sm:py-16">
      <header className="flex justify-end">
        <LanguageSwitcher />
      </header>
      <main className="flex flex-col gap-12">
        <HeroSection data={viewModel.hero} />
        <AboutSection data={viewModel.about} />
        <ExperienceSection data={viewModel.experience} />
        <SkillsSection data={viewModel.skills} />
        {viewModel.projects.items.length > 0 && (
          <ProjectsSection data={viewModel.projects} />
        )}
        <ContactSection data={viewModel.contact} />
      </main>
    </div>
  );
}


