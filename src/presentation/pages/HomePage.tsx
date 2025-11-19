"use client";

import { useEffect, useMemo, useState } from "react";

import type { Profile } from "@/core/domain/entities/profile";
import { Loader } from "@/presentation/components/atoms/Loader";
import { HomeTemplate } from "@/presentation/components/templates/HomeTemplate";
import { TranslationProvider } from "@/presentation/providers/TranslationProvider";

type ApiResponse = {
  data: Profile;
};

function LoadingState() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 bg-background text-foreground">
      <Loader />
      <p className="text-sm font-medium uppercase tracking-[0.4em] text-foreground/50">
        Cargando perfil...
      </p>
    </div>
  );
}

export function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProfile() {
      try {
        setError(null);
        const response = await fetch("/api/profile", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const result = (await response.json()) as ApiResponse;
        setProfile(result.data);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("No se pudo obtener el perfil:", fetchError);
        setError("No pudimos cargar la información. Intenta nuevamente más tarde.");
      }
    }

    fetchProfile();

    return () => {
      controller.abort();
    };
  }, []);

  const content = useMemo(() => {
    if (error) {
      return (
        <div className="flex min-h-dvh w-full items-center justify-center bg-background px-6 text-center text-foreground sm:px-12">
          <div className="max-w-lg space-y-3">
            <p className="text-lg font-semibold text-foreground">{error}</p>
            <p className="text-sm text-foreground/70">
              Puedes recargar la página o visitar mis redes sociales mientras restablecemos el servicio.
            </p>
          </div>
        </div>
      );
    }

    if (!profile) {
      return <LoadingState />;
    }

    return <HomeTemplate profile={profile} />;
  }, [error, profile]);

  return <TranslationProvider fallback={<LoadingState />}>{content}</TranslationProvider>;
}

