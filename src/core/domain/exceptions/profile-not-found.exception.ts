export class ProfileNotFoundException extends Error {
	constructor(userId?: string) {
		super(`Profile not found${userId ? ` for user ${userId}` : ""}`);
		this.name = "ProfileNotFoundException";
		// Mantiene el stack trace correcto
		Error.captureStackTrace?.(this, this.constructor);
	}
}
