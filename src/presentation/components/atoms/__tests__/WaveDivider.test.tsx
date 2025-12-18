import { render } from "@testing-library/react";
import { WaveDivider } from "../WaveDivider";

// framer-motion está mockeado globalmente en jest.setup.js

describe("WaveDivider", () => {
	it("should render wave divider", () => {
		const { container } = render(<WaveDivider />);
		const divider = container.querySelector("div");
		expect(divider).toBeInTheDocument();
	});

	it("should render SVG with wave path", () => {
		const { container } = render(<WaveDivider />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("viewBox", "0 0 1440 100");
		expect(svg).toHaveAttribute("preserveAspectRatio", "none");
	});

	it("should render with motion wrapper", () => {
		const { container } = render(<WaveDivider />);
		const div = container.querySelector("div");
		expect(div).toBeInTheDocument();
		// El mock de framer-motion filtra las props de animación, pero el componente se renderiza
	});
});

