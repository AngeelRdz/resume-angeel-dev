import { renderHook, act } from "@testing-library/react";
import { useScroll } from "../useScroll";

describe("useScroll", () => {
	beforeEach(() => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 0,
		});
		jest.clearAllMocks();
	});

	it("should return false when scroll is below threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 30,
		});
		const { result } = renderHook(() => useScroll(50));
		expect(result.current).toBe(false);
	});

	it("should return true when scroll is above threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 60,
		});
		const { result } = renderHook(() => useScroll(50));
		expect(result.current).toBe(true);
	});

	it("should return true when scroll equals threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 50,
		});
		const { result } = renderHook(() => useScroll(50));
		expect(result.current).toBe(false);
	});

	it("should update when scroll event fires", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			configurable: true,
			value: 0,
		});

		const { result } = renderHook(() => useScroll(50));

		act(() => {
			Object.defineProperty(window, "scrollY", {
				writable: true,
				configurable: true,
				value: 100,
			});
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current).toBe(true);
	});

	it("should use custom threshold", () => {
		Object.defineProperty(window, "scrollY", {
			writable: true,
			value: 30,
		});
		const { result } = renderHook(() => useScroll(20));
		expect(result.current).toBe(true);
	});

	it("should cleanup event listener on unmount", () => {
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
		const { unmount } = renderHook(() => useScroll(50));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
		removeEventListenerSpy.mockRestore();
	});
});

