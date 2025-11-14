import { NextResponse } from "next/server";

import { container } from "@/core/di/container";

export async function GET() {
	const getProfileUseCase = container.resolveGetProfileUseCase();

	try {
		const profile = await getProfileUseCase.execute();

		return NextResponse.json({
			data: profile,
		});
	} catch (error) {
		console.error("Error recuperando el perfil:", error);

		return NextResponse.json(
			{
				error: "Perfil no encontrado",
			},
			{
				status: 404,
			}
		);
	}
}
