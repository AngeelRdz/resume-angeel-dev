import { NextResponse } from "next/server";

import { getContainer } from "@/core/di/container";
import { ProfileNotFoundException } from "@/core/domain/exceptions/profile-not-found.exception";

export async function GET() {
	console.log("🔵 [API] /api/profile - Iniciando solicitud");
	const startTime = performance.now();

	const container = getContainer();
	const getProfileUseCase = container.resolveGetProfileUseCase();

	try {
		console.log("🔵 [API] /api/profile - Ejecutando caso de uso...");
		const profile = await getProfileUseCase.execute();
		const duration = Math.round(performance.now() - startTime);

		console.log("✅ [API] /api/profile - Perfil obtenido exitosamente");
		console.log(`⏱️  [API] /api/profile - Tiempo total: ${duration}ms`);

		return NextResponse.json({
			data: profile,
		});
	} catch (error) {
		const duration = Math.round(performance.now() - startTime);
		console.error(
			"❌ [API] /api/profile - Error recuperando el perfil:",
			error
		);
		console.log(`⏱️  [API] /api/profile - Tiempo hasta error: ${duration}ms`);

		if (error instanceof ProfileNotFoundException) {
			console.log("⚠️  [API] /api/profile - Perfil no encontrado (404)");
			return NextResponse.json(
				{
					error: "Perfil no encontrado",
				},
				{
					status: 404,
				}
			);
		}

		console.log("💥 [API] /api/profile - Error interno del servidor (500)");
		return NextResponse.json(
			{
				error: "Error interno del servidor",
			},
			{
				status: 500,
			}
		);
	}
}
