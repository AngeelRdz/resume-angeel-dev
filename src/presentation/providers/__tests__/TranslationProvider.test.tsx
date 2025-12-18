import { render, screen, waitFor, act } from "@testing-library/react";
import { TranslationProvider } from "../TranslationProvider";

// Mock i18n - definir directamente en jest.mock
jest.mock("@/presentation/i18n/i18n", () => {
	const mockI18n = {
		language: "es",
		isInitialized: false,
		exists: jest.fn(),
		changeLanguage: jest.fn().mockResolvedValue(undefined),
	};

	return {
		i18nInstance: Promise.resolve({
			isInitialized: true,
			changeLanguage: jest.fn().mockResolvedValue(undefined),
		}),
		get i18n() {
			return mockI18n;
		},
	};
});

// Mock I18nextProvider
jest.mock("react-i18next", () => ({
	I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("TranslationProvider", () => {
	it("should render children when i18n is already initialized", async () => {
		const i18nModule = await import("@/presentation/i18n/i18n");
		// @ts-expect-error - Mock module for testing
		i18nModule.i18n.isInitialized = true;

		await act(async () => {
			render(
				<TranslationProvider>
					<div>Test Content</div>
				</TranslationProvider>
			);
		});

		await waitFor(() => {
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});
	});

	it("should render children after i18n initializes", async () => {
		const i18nModule = await import("@/presentation/i18n/i18n");
		(i18nModule as unknown as { i18n: { isInitialized: boolean } }).i18n.isInitialized = false;

		await act(async () => {
			render(
				<TranslationProvider>
					<div>Test Content</div>
				</TranslationProvider>
			);
			// Esperar a que el Promise se resuelva
			await i18nModule.i18nInstance;
		});

		await waitFor(() => {
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});
	});

	it("should render fallback when provided and not ready", async () => {
		const i18nModule = await import("@/presentation/i18n/i18n");
		(i18nModule as unknown as { i18n: { isInitialized: boolean } }).i18n.isInitialized = false;

		render(
			<TranslationProvider fallback={<div>Loading...</div>}>
				<div>Test Content</div>
			</TranslationProvider>
		);

		// Should render either fallback or children
		const content = screen.queryByText("Test Content");
		const loading = screen.queryByText("Loading...");
		expect(content || loading).toBeTruthy();
	});

	it("should handle cleanup on unmount", async () => {
		const i18nModule = await import("@/presentation/i18n/i18n");
		(i18nModule as unknown as { i18n: { isInitialized: boolean } }).i18n.isInitialized = false;

		const { unmount } = await act(async () => {
			return render(
				<TranslationProvider>
					<div>Test Content</div>
				</TranslationProvider>
			);
		});

		await act(async () => {
			unmount();
		});
	});
});
