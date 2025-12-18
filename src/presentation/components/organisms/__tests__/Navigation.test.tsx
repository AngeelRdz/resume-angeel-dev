import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "../Navigation";

// Mock hooks
const mockUseI18n = {
	t: (key: string) => {
		const translations: Record<string, string> = {
			"nav.home": "Home",
			"nav.about": "About",
			"nav.experience": "Experience",
			"nav.skills": "Skills",
			"nav.projects": "Projects",
			"nav.contact": "Contact",
			"nav.menu": "Menu",
		};
		return translations[key] || key;
	},
	ready: true,
};

const mockUseScroll = jest.fn(() => false);
const mockUseTheme = jest.fn<() => { theme: "light" | "dark" }>(() => ({ theme: "light" }));

jest.mock("@/presentation/hooks/useTranslation", () => ({
	useI18n: () => mockUseI18n,
}));

jest.mock("@/presentation/hooks/useScroll", () => ({
	useScroll: () => mockUseScroll(),
}));

jest.mock("@/presentation/hooks/useTheme", () => ({
	useTheme: () => mockUseTheme(),
}));

// Mock ThemeToggle
jest.mock("@/presentation/components/atoms/ThemeToggle", () => ({
	ThemeToggle: ({
		isScrolled,
		isDark,
	}: {
		isScrolled?: boolean;
		isDark?: boolean;
	}) => (
		<button data-testid="theme-toggle" data-scrolled={isScrolled} data-dark={isDark}>
			Theme
		</button>
	),
}));

// Mock LanguageSwitcher
jest.mock("@/presentation/components/molecules/LanguageSwitcher", () => ({
	LanguageSwitcher: ({ isScrolled }: { isScrolled?: boolean }) => (
		<button data-testid="language-switcher" data-scrolled={isScrolled}>
			Language
		</button>
	),
}));

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

describe("Navigation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseScroll.mockReturnValue(false);
		mockUseTheme.mockReturnValue({ theme: "light" });
		document.querySelector = jest.fn();
	});

	it("should render navigation items", () => {
		render(<Navigation />);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
		expect(screen.getByText("Experience")).toBeInTheDocument();
		expect(screen.getByText("Skills")).toBeInTheDocument();
		expect(screen.getByText("Projects")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();
	});

	it("should render theme toggle", () => {
		render(<Navigation />);
		expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
	});

	it("should render language switcher", () => {
		render(<Navigation />);
		expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
	});

	it("should toggle mobile menu", () => {
		render(<Navigation />);
		const menuButton = screen.getByLabelText("Menu");
		expect(menuButton).toHaveAttribute("aria-expanded", "false");

		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute("aria-expanded", "true");

		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
	});

	it("should handle nav click and scroll to element", () => {
		const mockElement = {
			scrollIntoView: mockScrollIntoView,
		};
		(document.querySelector as jest.Mock).mockReturnValue(mockElement);

		render(<Navigation />);
		const homeButton = screen.getByText("Home");

		fireEvent.click(homeButton);
		expect(document.querySelector).toHaveBeenCalledWith("#home");
		expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
	});

	it("should close menu when nav item is clicked", () => {
		render(<Navigation />);
		const menuButton = screen.getByLabelText("Menu");

		// Open menu
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute("aria-expanded", "true");

		// Click nav item
		const homeButton = screen.getByText("Home");
		fireEvent.click(homeButton);

		// Menu should be closed
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
	});

	it("should not crash when element is not found", () => {
		(document.querySelector as jest.Mock).mockReturnValue(null);

		render(<Navigation />);
		const homeButton = screen.getByText("Home");

		expect(() => {
			fireEvent.click(homeButton);
		}).not.toThrow();
	});

	it("should pass scrolled state to ThemeToggle and LanguageSwitcher", () => {
		mockUseScroll.mockReturnValue(true);
		render(<Navigation />);

		expect(screen.getByTestId("theme-toggle")).toHaveAttribute("data-scrolled", "true");
		expect(screen.getByTestId("language-switcher")).toHaveAttribute("data-scrolled", "true");
	});

	it("should pass dark theme state to ThemeToggle", () => {
		mockUseTheme.mockReturnValue({ theme: "dark" as const });
		render(<Navigation />);

		expect(screen.getByTestId("theme-toggle")).toHaveAttribute("data-dark", "true");
	});

	it("should not render when i18n is not ready", () => {
		mockUseI18n.ready = false;
		const { container } = render(<Navigation />);
		expect(container.firstChild).toBeNull();
	});
});

