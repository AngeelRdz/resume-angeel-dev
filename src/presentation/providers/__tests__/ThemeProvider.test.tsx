import { render } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString();
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
	writable: true,
});

describe("ThemeProvider", () => {
	beforeEach(() => {
		localStorageMock.clear();
		document.documentElement.removeAttribute("data-theme");
	});

	it("should render children", () => {
		const { getByText } = render(
			<ThemeProvider>
				<div>Test Content</div>
			</ThemeProvider>
		);
		expect(getByText("Test Content")).toBeInTheDocument();
	});

	it("should apply light theme by default when no stored theme", () => {
		render(
			<ThemeProvider>
				<div>Content</div>
			</ThemeProvider>
		);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});

	it("should apply stored theme from localStorage", () => {
		localStorageMock.setItem("app_theme_resume", "dark");
		render(
			<ThemeProvider>
				<div>Content</div>
			</ThemeProvider>
		);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
	});

	it("should apply light theme when stored theme is light", () => {
		localStorageMock.setItem("app_theme_resume", "light");
		render(
			<ThemeProvider>
				<div>Content</div>
			</ThemeProvider>
		);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});
});

