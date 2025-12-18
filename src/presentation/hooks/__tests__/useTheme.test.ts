import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../useTheme";

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

describe("useTheme", () => {
	beforeEach(() => {
		localStorageMock.clear();
		document.documentElement.removeAttribute("data-theme");
	});

	it("should return light theme by default when no stored theme", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toBe("light");
		expect(result.current.mounted).toBe(true);
	});

	it("should return stored theme from localStorage", () => {
		localStorageMock.setItem("app_theme_resume", "dark");
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toBe("dark");
	});

	it("should apply theme to document on mount", () => {
		localStorageMock.setItem("app_theme_resume", "dark");
		renderHook(() => useTheme());
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
	});

	it("should toggle theme from light to dark", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toBe("light");

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.theme).toBe("dark");
		expect(localStorageMock.getItem("app_theme_resume")).toBe("dark");
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
	});

	it("should toggle theme from dark to light", () => {
		localStorageMock.setItem("app_theme_resume", "dark");
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.toggleTheme();
		});

		expect(result.current.theme).toBe("light");
		expect(localStorageMock.getItem("app_theme_resume")).toBe("light");
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});

	it("should update document theme when theme changes", () => {
		const { result } = renderHook(() => useTheme());

		act(() => {
			result.current.toggleTheme();
		});

		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

		act(() => {
			result.current.toggleTheme();
		});

		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});

	it("should return mounted as true when window is defined", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.mounted).toBe(true);
	});
});
