import { renderHook, waitFor, act } from "@testing-library/react";
import { useI18n } from "../useTranslation";
import { getContainer } from "@/core/di/container";

// Mock react-i18next
const mockI18n = {
	language: "es",
	isInitialized: true,
	exists: jest.fn((key: string) => key !== "missing.key"),
	changeLanguage: jest.fn().mockResolvedValue(undefined),
};

jest.mock("react-i18next", () => ({
	useTranslation: jest.fn(() => ({
		t: (key: string) => key,
		i18n: mockI18n,
	})),
}));

// Mock container
jest.mock("@/core/di/container", () => ({
	getContainer: jest.fn(),
}));

// Mock i18nInstance
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

describe("useI18n", () => {
	const mockI18nService = {
		changeLanguage: jest.fn().mockResolvedValue(undefined),
		getCurrentLanguage: jest.fn().mockResolvedValue("es"),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(console, "error").mockImplementation(() => {});
		mockI18n.isInitialized = true;
		(getContainer as jest.Mock).mockReturnValue({
			resolveI18nService: () => mockI18nService,
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should return translation function", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(typeof result.current.t).toBe("function");
	});

	it("should return current language", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(result.current.currentLanguage).toBe("es");
		expect(result.current.locale).toBe("es");
	});

	it("should return locale from language code", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(["es", "en"]).toContain(result.current.locale);
	});

	it("should change language using service", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		await act(async () => {
			await result.current.changeLanguage("en");
		});

		expect(mockI18nService.changeLanguage).toHaveBeenCalledWith("en");
	});

	it("should handle changeLanguage errors gracefully", async () => {
		mockI18nService.changeLanguage.mockRejectedValueOnce(
			new Error("Service error")
		);

		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		await act(async () => {
			await result.current.changeLanguage("en");
		});

		expect(mockI18nService.changeLanguage).toHaveBeenCalled();
	});

	it("should return exists function", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(typeof result.current.exists).toBe("function");
	});

	it("should return ready state", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(result.current.ready).toBe(true);
	});

	it("should return setLocale as alias for changeLanguage", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		await act(async () => {
			await result.current.setLocale("en");
		});

		expect(mockI18nService.changeLanguage).toHaveBeenCalledWith("en");
	});

	it("should handle changeLanguage when service fails and i18n is not initialized", async () => {
		mockI18nService.changeLanguage.mockRejectedValueOnce(
			new Error("Service error")
		);
		mockI18n.isInitialized = false;

		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		await act(async () => {
			await result.current.changeLanguage("en");
		});

		expect(mockI18nService.changeLanguage).toHaveBeenCalled();
		expect(mockI18n.changeLanguage).not.toHaveBeenCalled();
	});

	it("should return safe translation when i18n is not initialized", async () => {
		mockI18n.isInitialized = false;
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		const translation = result.current.t("test.key");
		expect(translation).toBe("key");
	});

	it("should return safe translation when translation key not found", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		const translation = result.current.t("missing.key");
		expect(translation).toBe("key");
	});

	it("should return safe translation when key has no dots", async () => {
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		const translation = result.current.t("simplekey");
		expect(translation).toBe("simplekey");
	});

	it("should handle i18nInstance error gracefully", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		// Get the current mock module
		const i18nModule = await import("@/presentation/i18n/i18n");

		// Create a promise that rejects, but catch it immediately to prevent unhandled rejection
		const rejectedPromise = Promise.reject(new Error("i18n error"));
		rejectedPromise.catch(() => {
			// Silently catch to prevent unhandled rejection warning
		});

		// Temporarily replace i18nInstance
		const originalInstance = i18nModule.i18nInstance;

		// Replace the export
		Object.defineProperty(i18nModule, "i18nInstance", {
			value: rejectedPromise,
			writable: true,
			configurable: true,
		});

		const { result } = renderHook(() => useI18n());

		// Wait for the error to be handled - the hook sets isReady to true even on error
		await waitFor(
			() => {
				// The hook should handle the error gracefully and still set isReady to true
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		// Verify that the hook handles the error gracefully
		// The hook should set isReady to true even when i18nInstance rejects
		// This ensures the UI doesn't hang waiting for i18n
		expect(result.current.isReady || result.current.ready).toBe(true);

		// Restore original instance
		Object.defineProperty(i18nModule, "i18nInstance", {
			value: originalInstance,
			writable: true,
			configurable: true,
		});

		consoleErrorSpy.mockRestore();
	});

	it("should return locale from language code with locale", async () => {
		mockI18n.language = "es-MX";
		const { result } = renderHook(() => useI18n());

		await waitFor(
			() => {
				expect(result.current.isReady || result.current.ready).toBe(true);
			},
			{ timeout: 2000 }
		);

		expect(result.current.locale).toBe("es");
	});
});
