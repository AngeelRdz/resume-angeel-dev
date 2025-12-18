import { render, screen } from "@testing-library/react";
import { Text } from "../Text";

describe("Text", () => {
	it("should render as paragraph by default", () => {
		render(<Text>Test text</Text>);
		const text = screen.getByText("Test text");
		expect(text.tagName).toBe("P");
	});

	it("should render with different HTML elements", () => {
		const { rerender } = render(<Text as="span">Span text</Text>);
		expect(screen.getByText("Span text").tagName).toBe("SPAN");

		rerender(<Text as="div">Div text</Text>);
		expect(screen.getByText("Div text").tagName).toBe("DIV");
	});

	it("should apply default variant (body) styles", () => {
		const { container } = render(<Text>Body text</Text>);
		const text = container.querySelector("p");
		expect(text).toHaveClass("text-base", "text-foreground/90");
	});

	it("should apply different variant styles", () => {
		const { container: container1 } = render(<Text variant="muted">Muted</Text>);
		expect(container1.querySelector("p")).toHaveClass("text-foreground/60");

		const { container: container2 } = render(<Text variant="small">Small</Text>);
		expect(container2.querySelector("p")).toHaveClass("text-sm", "text-foreground/80");

		const { container: container3 } = render(<Text variant="caption">Caption</Text>);
		expect(container3.querySelector("p")).toHaveClass("text-xs", "uppercase");
	});

	it("should apply custom className", () => {
		const { container } = render(<Text className="custom-class">Test</Text>);
		const text = container.querySelector("p");
		expect(text).toHaveClass("custom-class");
	});

	it("should combine variant and custom classes", () => {
		const { container } = render(
			<Text variant="small" className="custom-class">
				Test
			</Text>
		);
		const text = container.querySelector("p");
		expect(text).toHaveClass("text-sm", "custom-class");
	});

	it("should render children correctly", () => {
		render(
			<Text>
				<span>Nested content</span>
			</Text>
		);
		expect(screen.getByText("Nested content")).toBeInTheDocument();
	});
});

