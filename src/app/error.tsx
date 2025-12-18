"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Error en la aplicación:", error);
	}, [error]);

	return (
		<div className="flex min-h-dvh w-full items-center justify-center bg-background px-6 text-center text-foreground sm:px-12">
			<div className="max-w-lg space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Algo salió mal
				</h2>
				<p className="text-sm text-foreground/70">
					No pudimos cargar la información. Por favor, intenta nuevamente.
				</p>
				<button
					onClick={reset}
					className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Intentar de nuevo
				</button>
			</div>
		</div>
	);
}

