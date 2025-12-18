import { render, screen, act } from "@testing-library/react";
import { ActionBar } from "../ActionBar";
import { useTheme } from "@/presentation/hooks/useTheme";
import type { HeroAction } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// Mock useTheme
jest.mock("@/presentation/hooks/useTheme");
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("ActionBar", () => {
	const mockActions: HeroAction[] = [
		{
			label: "Contact Me",
			href: "mailto:test@example.com",
			variant: "primary",
		},
		{
			label: "View LinkedIn",
			href: "https://linkedin.com",
			variant: "secondary",
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseTheme.mockReturnValue({
			theme: "light",
			toggleTheme: jest.fn(),
			mounted: true,
		});

		// Mock document.documentElement
		Object.defineProperty(document.documentElement, "getAttribute", {
			writable: true,
			value: jest.fn(() => "light"),
		});
	});

	it("should render all actions", () => {
		render(<ActionBar actions={mockActions} />);
		expect(screen.getByText("Contact Me")).toBeInTheDocument();
		expect(screen.getByText("View LinkedIn")).toBeInTheDocument();
	});

	it("should return null when actions array is empty", () => {
		const { container } = render(<ActionBar actions={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it("should render primary action button", () => {
		render(<ActionBar actions={[mockActions[0]]} />);
		const button = screen.getByText("Contact Me");
		expect(button).toBeInTheDocument();
	});

	it("should render secondary action button", () => {
		render(<ActionBar actions={[mockActions[1]]} />);
		const button = screen.getByText("View LinkedIn");
		expect(button).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		const { container } = render(
			<ActionBar actions={mockActions} className="custom-class" />
		);
		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper).toHaveClass("custom-class");
	});

	it("should handle download attribute", () => {
		const actionsWithDownload: HeroAction[] = [
			{
				label: "Download CV",
				href: "https://example.com/cv.pdf" as ExternalHref,
				variant: "primary",
				download: true,
			},
		];
		render(<ActionBar actions={actionsWithDownload} />);
		const button = screen.getByText("Download CV");
		expect(button).toBeInTheDocument();
		const link = button.closest("a");
		expect(link).toHaveAttribute("download");
		expect(link).toHaveAttribute("href", "https://example.com/cv.pdf");
	});

	it("should update isDark when theme changes", async () => {
		render(<ActionBar actions={mockActions} />);
		
		// Cambiar el tema en el DOM
		await act(async () => {
			document.documentElement.setAttribute("data-theme", "dark");
			// Esperar a que el MutationObserver procese el cambio
			await new Promise((resolve) => setTimeout(resolve, 10));
		});
	});

	it("should handle dark theme for primary button", () => {
		mockUseTheme.mockReturnValue({
			theme: "dark",
			toggleTheme: jest.fn(),
			mounted: true,
		});

		Object.defineProperty(document.documentElement, "getAttribute", {
			writable: true,
			value: jest.fn(() => "dark"),
		});

		render(<ActionBar actions={[mockActions[0]]} />);
		const button = screen.getByText("Contact Me");
		expect(button).toBeInTheDocument();
	});

	it("should handle light theme for primary button", () => {
		mockUseTheme.mockReturnValue({
			theme: "light",
			toggleTheme: jest.fn(),
			mounted: true,
		});

		Object.defineProperty(document.documentElement, "getAttribute", {
			writable: true,
			value: jest.fn(() => "light"),
		});

		render(<ActionBar actions={[mockActions[0]]} />);
		const button = screen.getByText("Contact Me");
		expect(button).toBeInTheDocument();
	});

	it("should handle secondary variant with external link", () => {
		const secondaryAction: HeroAction = {
			label: "Secondary Action",
			href: "https://example.com/secondary" as ExternalHref,
			variant: "secondary",
		};
		render(<ActionBar actions={[secondaryAction]} />);
		const link = screen.getByRole("link", { name: "Secondary Action" });
		expect(link).toBeInTheDocument();
	});

	it("should apply correct styles for secondary button in dark mode", () => {
		mockUseTheme.mockReturnValue({
			theme: "dark",
			toggleTheme: jest.fn(),
			mounted: true,
		});

		Object.defineProperty(document.documentElement, "getAttribute", {
			writable: true,
			value: jest.fn(() => "dark"),
		});

		render(<ActionBar actions={[mockActions[1]]} />);
		const button = screen.getByText("View LinkedIn");
		expect(button).toBeInTheDocument();
	});
});

