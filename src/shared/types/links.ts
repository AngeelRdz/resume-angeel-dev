export type ExternalHref =
	| `http://${string}`
	| `https://${string}`
	| `mailto:${string}`
	| `tel:${string}`;
