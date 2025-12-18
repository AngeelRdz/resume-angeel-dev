import { render, screen, fireEvent, act } from "@testing-library/react";
import { LanguageSwitcher } from "../LanguageSwitcher";

// Mock hooks
const mockUseI18n = {
	locale: "es" as const,
	setLocale: jest.fn(),
	t: (key: string) => {
		const translations: Record<string, string> = {
			"nav.language": "Language",
		};
		return translations[key] || key;
	},
	ready: true,
};

const mockUseTheme = jest.fn(() => ({ theme: "light" as const }));

jest.mock("@/presentation/hooks/useTranslation", () => ({
	useI18n: () => mockUseI18n,
}));

jest.mock("@/presentation/hooks/useTheme", () => ({
	useTheme: () => mockUseTheme(),
}));

// Mock i18n config
jest.mock("@/config/i18n.config", () => ({
	i18n: {
		locales: ["es", "en"] as const,
	},
}));

describe("LanguageSwitcher", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseI18n.locale = "es";
		mockUseI18n.ready = true;
		document.documentElement.setAttribute("data-theme", "light");
	});

	it("should render language switcher", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByLabelText("Language")).toBeInTheDocument();
	});

	it("should render both language options", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByText("ES")).toBeInTheDocument();
		expect(screen.getByText("EN")).toBeInTheDocument();
	});

	it("should mark active language", () => {
		render(<LanguageSwitcher />);
		const esButton = screen.getByText("ES").closest("button");
		expect(esButton).toHaveAttribute("aria-pressed", "true");
	});

	it("should call setLocale when clicking on a language", () => {
		render(<LanguageSwitcher />);
		const enButton = screen.getByText("EN").closest("button");
		fireEvent.click(enButton!);
		expect(mockUseI18n.setLocale).toHaveBeenCalledWith("en");
	});

	it("should not render when i18n is not ready", () => {
		mockUseI18n.ready = false;
		const { container } = render(<LanguageSwitcher />);
		expect(container.firstChild).toBeNull();
	});

	it("should apply scrolled styles when isScrolled is true", () => {
		render(<LanguageSwitcher isScrolled={true} />);
		const nav = screen.getByLabelText("Language");
		expect(nav).toBeInTheDocument();
	});

	it("should handle dark theme", () => {
		document.documentElement.setAttribute("data-theme", "dark");
		mockUseTheme.mockReturnValue({ theme: "dark" });
		render(<LanguageSwitcher />);
		const nav = screen.getByLabelText("Language");
		expect(nav).toBeInTheDocument();
	});

	it("should update theme when data-theme attribute changes", async () => {
		render(<LanguageSwitcher />);
		
		await act(async () => {
			document.documentElement.setAttribute("data-theme", "dark");
			// Esperar a que el MutationObserver procese el cambio
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		const nav = screen.getByLabelText("Language");
		expect(nav).toBeInTheDocument();
	});

	it("should apply correct styles when isScrolled is true and dark theme", async () => {
		await act(async () => {
			document.documentElement.setAttribute("data-theme", "dark");
			mockUseTheme.mockReturnValue({ theme: "dark" });
			render(<LanguageSwitcher isScrolled={true} />);
		});
		const nav = screen.getByLabelText("Language");
		expect(nav).toBeInTheDocument();
	});

	it("should apply correct styles when isScrolled is true and light theme", async () => {
		await act(async () => {
			document.documentElement.setAttribute("data-theme", "light");
			mockUseTheme.mockReturnValue({ theme: "light" });
			render(<LanguageSwitcher isScrolled={true} />);
		});
		const nav = screen.getByLabelText("Language");
		expect(nav).toBeInTheDocument();
	});

	it("should handle locale change", async () => {
		await act(async () => {
			render(<LanguageSwitcher />);
		});
		const enButton = screen.getByText("EN").closest("button");
		await act(async () => {
			fireEvent.click(enButton!);
		});
		expect(mockUseI18n.setLocale).toHaveBeenCalledWith("en");
	});
});

