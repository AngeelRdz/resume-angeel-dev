// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "/",
			query: {},
			asPath: "/",
			push: jest.fn(),
			pop: jest.fn(),
			reload: jest.fn(),
			back: jest.fn(),
			prefetch: jest.fn().mockResolvedValue(undefined),
			beforePopState: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
				emit: jest.fn(),
			},
			isFallback: false,
		};
	},
}));

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "/";
	},
	notFound: jest.fn(),
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const React = require("react");
	return function MockLink({ children, href, prefetch, ...props }) {
		// Filter out prefetch if it's false to avoid React warning
		const filteredProps = { ...props };
		// Only include prefetch if it's explicitly true
		if (prefetch === true) {
			filteredProps.prefetch = true;
		}
		// If prefetch is false or undefined, don't include it in props at all
		// This prevents React from warning about non-boolean attributes
		return React.createElement("a", { href, ...filteredProps }, children);
	};
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
};

// Mock localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock global de framer-motion para todos los tests
jest.mock("framer-motion", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const React = require("react");
	const motionProps = [
		"initial",
		"animate",
		"exit",
		"whileHover",
		"whileTap",
		"whileInView",
		"whileFocus",
		"whileDrag",
		"variants",
		"transition",
		"viewport",
		"layout",
		"layoutId",
		"drag",
		"dragConstraints",
		"dragElastic",
		"dragMomentum",
		"onDrag",
		"onDragStart",
		"onDragEnd",
	];

	const filterMotionProps = (props) => {
		if (!props) {
			return {};
		}
		const filtered = {};
		for (const key in props) {
			if (!motionProps.includes(key)) {
				filtered[key] = props[key];
			}
		}
		return filtered;
	};

	const createMotionComponent = (tag) => {
		const Component = React.forwardRef((props, ref) => {
			if (!props) {
				return React.createElement(tag, { ref });
			}
			const { children, ...rest } = props;
			const filteredProps = filterMotionProps(rest);
			return React.createElement(tag, { ...filteredProps, ref }, children);
		});
		Component.displayName = `motion.${tag}`;
		return Component;
	};

	return {
		motion: {
			div: createMotionComponent("div"),
			section: createMotionComponent("section"),
			article: createMotionComponent("article"),
			nav: createMotionComponent("nav"),
			ul: createMotionComponent("ul"),
			li: createMotionComponent("li"),
			span: createMotionComponent("span"),
			p: createMotionComponent("p"),
			h1: createMotionComponent("h1"),
			h2: createMotionComponent("h2"),
			h3: createMotionComponent("h3"),
			h4: createMotionComponent("h4"),
			h5: createMotionComponent("h5"),
			h6: createMotionComponent("h6"),
			button: createMotionComponent("button"),
			a: createMotionComponent("a"),
		},
		AnimatePresence: ({ children }) =>
			React.createElement(React.Fragment, null, children),
	};
});

// Mock de console.error para evitar warnings en tests
const originalError = console.error;
beforeAll(() => {
	console.error = (...args) => {
		// Convert all args to string and check for warnings to suppress
		const fullMessage = args.map((arg) => String(arg)).join(" ");
		// Check if this is a prefetch warning - check all variations
		const isPrefetchWarning =
			fullMessage.includes("prefetch") &&
			(fullMessage.includes("Received `false`") ||
				fullMessage.includes("non-boolean attribute"));
		if (
			fullMessage.includes("Warning: ReactDOM.render is deprecated") ||
			fullMessage.includes(
				"Warning: Received `true` for a non-boolean attribute"
			) ||
			fullMessage.includes(
				"Warning: Received `false` for a non-boolean attribute"
			) ||
			fullMessage.includes("Received `false` for a non-boolean attribute") ||
			isPrefetchWarning ||
			fullMessage.includes("Warning: Invalid DOM property") ||
			fullMessage.includes("Warning: React does not recognize the") ||
			fullMessage.includes("Warning: Unknown event handler property") ||
			fullMessage.includes("Warning: Failed to parse CSS") ||
			fullMessage.includes("An update to") ||
			fullMessage.includes("was not wrapped in act")
		) {
			return;
		}
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});
