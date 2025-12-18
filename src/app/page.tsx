import type { Metadata } from "next";
import { Suspense } from "react";

import { getContainer } from "@/core/di/container";
import { ProfileNotFoundException } from "@/core/domain/exceptions/profile-not-found.exception";
import { Loader } from "@/presentation/components/atoms/Loader";
import { HomeTemplate } from "@/presentation/components/templates/HomeTemplate";
import { TranslationProvider } from "@/presentation/providers/TranslationProvider";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Ángel Rodríguez | Frontend Engineer",
	description:
		"Portafolio de Ángel Rodríguez, desarrollador Frontend especializado en crear experiencias web escalables y de alto rendimiento con Next.js, React y TypeScript.",
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

async function ProfileContent() {
	console.log("🌐 [Server Component] ProfileContent - Iniciando carga de perfil");

	const container = getContainer();
	const getProfileUseCase = container.resolveGetProfileUseCase();

	let profile;
	try {
		console.log("🌐 [Server Component] ProfileContent - Ejecutando caso de uso...");
		profile = await getProfileUseCase.execute();
		console.log("✅ [Server Component] ProfileContent - Perfil cargado exitosamente");
	} catch (error) {
		console.error("❌ [Server Component] ProfileContent - Error:", error);
		if (error instanceof ProfileNotFoundException) {
			console.log("⚠️  [Server Component] ProfileContent - Perfil no encontrado, redirigiendo a 404");
			notFound();
		}
		throw error;
	}

	return <HomeTemplate profile={profile} />;
}

export default async function RootHomePage() {
	return (
		<TranslationProvider fallback={<LoadingState />}>
			<Suspense fallback={<LoadingState />}>
				<ProfileContent />
			</Suspense>
		</TranslationProvider>
	);
}

