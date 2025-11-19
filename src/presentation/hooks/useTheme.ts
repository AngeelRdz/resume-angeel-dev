"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "app_theme_resume";

function applyTheme(newTheme: Theme) {
	const root = document.documentElement;
	root.setAttribute("data-theme", newTheme);
	localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
			const initialTheme = stored || "light";
			applyTheme(initialTheme);
			return initialTheme;
		}
		return "light";
	});
	const [mounted] = useState(() => typeof window !== "undefined");

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const toggleTheme = () => {
		const newTheme: Theme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
	};

	return {
		theme,
		toggleTheme,
		mounted,
	};
}
