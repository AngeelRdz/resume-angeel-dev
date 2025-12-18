import { render, screen, waitFor, act } from "@testing-library/react";
import { I18nProvider } from "../I18nProvider";

// Mock i18n
jest.mock("@/presentation/i18n/i18n", () => ({
	i18nInstance: Promise.resolve({
		isInitialized: true,
		changeLanguage: jest.fn().mockResolvedValue(undefined),
	}),
	i18n: {
		language: "es",
		isInitialized: true,
		exists: jest.fn(),
		changeLanguage: jest.fn().mockResolvedValue(undefined),
	},
}));

// Mock I18nextProvider
jest.mock("react-i18next", () => ({
	I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("I18nProvider", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render children when i18n is ready", async () => {
		await act(async () => {
			render(
				<I18nProvider>
					<div>Test Content</div>
				</I18nProvider>
			);
		});

		await waitFor(() => {
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});
	});

});
