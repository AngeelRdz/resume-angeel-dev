import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-dvh w-full items-center justify-center bg-background px-6 text-center text-foreground sm:px-12">
			<div className="max-w-lg space-y-4">
				<h2 className="text-2xl font-semibold text-foreground">
					Página no encontrada
				</h2>
				<p className="text-sm text-foreground/70">
					La página que buscas no existe o ha sido movida.
				</p>
				<Link
					href="/"
					className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Volver al inicio
				</Link>
			</div>
		</div>
	);
}

