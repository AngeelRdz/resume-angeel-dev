import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../ThemeToggle";
import { useTheme } from "@/presentation/hooks/useTheme";

// Mock useTheme hook
jest.mock("@/presentation/hooks/useTheme");

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("ThemeToggle", () => {
	const mockToggleTheme = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseTheme.mockReturnValue({
			theme: "light",
			toggleTheme: mockToggleTheme,
			mounted: true,
		});
	});

	it("should render button when mounted", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: /cambiar a tema/i });
		expect(button).toBeInTheDocument();
	});

	it("should render placeholder button when not mounted", () => {
		mockUseTheme.mockReturnValue({
			theme: "light",
			toggleTheme: mockToggleTheme,
			mounted: false,
		});

		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: "Toggle theme" });
		expect(button).toBeInTheDocument();
	});

	it("should call toggleTheme when clicked", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: /cambiar a tema/i });

		await user.click(button);

		expect(mockToggleTheme).toHaveBeenCalledTimes(1);
	});

	it("should show correct aria-label for light theme", () => {
		mockUseTheme.mockReturnValue({
			theme: "light",
			toggleTheme: mockToggleTheme,
			mounted: true,
		});

		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: "Cambiar a tema oscuro" });
		expect(button).toBeInTheDocument();
	});

	it("should show correct aria-label for dark theme", () => {
		mockUseTheme.mockReturnValue({
			theme: "dark",
			toggleTheme: mockToggleTheme,
			mounted: true,
		});

		render(<ThemeToggle />);
		const button = screen.getByRole("button", { name: "Cambiar a tema claro" });
		expect(button).toBeInTheDocument();
	});

	it("should apply correct classes when scrolled and dark", () => {
		const { container } = render(<ThemeToggle isScrolled={true} isDark={true} />);
		const button = container.querySelector("button");
		expect(button).toHaveClass("lg:border-foreground/30", "lg:hover:bg-primary/20");
	});

	it("should apply correct classes when scrolled and light", () => {
		const { container } = render(<ThemeToggle isScrolled={true} isDark={false} />);
		const button = container.querySelector("button");
		expect(button).toHaveClass("lg:border-foreground/20", "lg:bg-white");
	});

	it("should apply correct classes when not scrolled", () => {
		const { container } = render(<ThemeToggle isScrolled={false} />);
		const button = container.querySelector("button");
		expect(button).toHaveClass("lg:border-white/30", "lg:bg-transparent");
	});
});

