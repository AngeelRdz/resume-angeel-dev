import { render, screen } from "@testing-library/react";
import { Heading } from "../Heading";

describe("Heading", () => {
	it("should render with default level (h2)", () => {
		render(<Heading>Test Heading</Heading>);
		const heading = screen.getByRole("heading", { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Test Heading");
	});

	it("should render with different heading levels", () => {
		const { rerender } = render(<Heading as={1}>H1 Heading</Heading>);
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

		rerender(<Heading as={3}>H3 Heading</Heading>);
		expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

		rerender(<Heading as={4}>H4 Heading</Heading>);
		expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
	});

	it("should apply correct styles for each level", () => {
		const { container } = render(<Heading as={1}>H1</Heading>);
		const heading = container.querySelector("h1");
		expect(heading).toHaveClass("text-4xl", "font-bold");

		const { container: container2 } = render(<Heading as={2}>H2</Heading>);
		const heading2 = container2.querySelector("h2");
		expect(heading2).toHaveClass("text-3xl", "font-semibold");
	});

	it("should apply alignment styles", () => {
		const { container } = render(<Heading align="center">Centered</Heading>);
		const heading = container.querySelector("h2");
		expect(heading).toHaveClass("text-center");

		const { container: container2 } = render(<Heading align="right">Right</Heading>);
		const heading2 = container2.querySelector("h2");
		expect(heading2).toHaveClass("text-right");
	});

	it("should apply custom className", () => {
		const { container } = render(<Heading className="custom-class">Test</Heading>);
		const heading = container.querySelector("h2");
		expect(heading).toHaveClass("custom-class");
	});

	it("should combine default, alignment, and custom classes", () => {
		const { container } = render(
			<Heading align="center" className="custom-class">
				Test
			</Heading>
		);
		const heading = container.querySelector("h2");
		expect(heading).toHaveClass("text-center", "custom-class");
	});
});

