// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"config/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{ts,tsx}",
		"!src/**/__tests__/**",
		"!src/**/__mocks__/**",
		"!src/app/**", // Excluir app router (Next.js maneja esto)
		"!src/presentation/i18n/**", // Excluir configuraciones de i18n
		"!**/index.{ts,tsx}", // Excluir archivos index que solo re-exportan
		"!src/core/application/ports/**", // Excluir interfaces/ports (no generan código ejecutable)
		"!src/core/application/services/**", // Excluir interfaces de servicios (no generan código ejecutable)
		"!src/core/domain/entities/**", // Excluir entidades (solo tipos/interfaces)
		"!src/shared/types/**", // Excluir tipos TypeScript (no generan código ejecutable)
	],
	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	// Ignorar archivos index.ts que solo re-exportan
	testPathIgnorePatterns: [
		"/node_modules/",
		"/.next/",
		"/coverage/",
		"/prisma/",
	],
	// Transformar archivos TypeScript
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react-jsx",
				},
			},
		],
	},
	// Módulos que no necesitan transformación
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
	// Configuración de cobertura
	coverageReporters: [
		[
			"text",
			{
				skipFull: false, // Mostrar TODOS los archivos, incluso los que tienen 100%
			},
		],
		"text-summary", // Resumen al final
		[
			"html",
			{
				subdir: ".",
			},
		], // Reporte HTML en coverage/
		"json", // Reporte JSON en coverage/
		"lcov", // Reporte LCOV para CI/CD
	],
	coverageDirectory: "coverage",
	coverageProvider: "v8", // Usar v8 para mejor rendimiento y reportes más detallados
	// Mostrar solo archivos con cobertura < 100%
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/.next/",
		"/coverage/",
		"/prisma/",
		"__tests__",
		"__mocks__",
	],
	// Umbrales de cobertura
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	verbose: true,
	clearMocks: true,
	restoreMocks: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
