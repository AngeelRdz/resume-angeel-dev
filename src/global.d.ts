/// <reference types="@testing-library/jest-dom" />
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
	// Jest globals
	var describe: (name: string, fn: () => void) => void;
	var it: (name: string, fn: () => void | Promise<void>) => void;
	var test: typeof it;
	var expect: <T = any>(
		actual: T
	) => T extends Promise<unknown> ? jest.PromiseMatchers : jest.Matchers<void>;
	var beforeEach: (fn: () => void | Promise<void>) => void;
	var afterEach: (fn: () => void | Promise<void>) => void;
	var beforeAll: (fn: () => void | Promise<void>) => void;
	var afterAll: (fn: () => void | Promise<void>) => void;

	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
			toHaveClass(...classNames: string[]): R;
			toHaveAttribute(attr: string, value?: string): R;
			toHaveBeenCalled(): R;
			toHaveBeenCalledTimes(times: number): R;
			toHaveBeenCalledWith(...args: any[]): R;
			toEqual(expected: any): R;
			toBe(expected: any): R;
			toBeInstanceOf(constructor: new (...args: any[]) => any): R;
			toContain(item: any): R;
			toBeNull(): R;
			toBeDefined(): R;
			toBeTruthy(): R;
			toBeFalsy(): R;
			toHaveLength(length: number): R;
			toHaveProperty(key: string, value?: any): R;
		}

		interface PromiseMatchers {
			rejects: {
				toThrow(error?: any): Promise<void>;
			};
			resolves: Matchers<Promise<void>>;
		}

		function fn<T extends (...args: any[]) => any>(
			implementation?: T
		): MockedFunction<T>;

		interface MockedFunction<T extends (...args: any[]) => any> {
			(...args: Parameters<T>): ReturnType<T>;
			mockResolvedValue(
				value: ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>
			): this;
			mockRejectedValue(value: any): this;
			mockReturnValue(value: ReturnType<T>): this;
			mockImplementation(fn: T): this;
		}

		type Mocked<T> = {
			[P in keyof T]: T[P] extends (...args: any[]) => any
				? MockedFunction<T[P]>
				: T[P] extends Promise<infer U>
				? Promise<U>
				: T[P];
		} & T;
	}
}

export {};
