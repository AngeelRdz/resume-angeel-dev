import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe("Loader", () => {
	it("should render loader element", () => {
		render(<Loader />);
		const loader = screen.getByLabelText("Cargando");
		expect(loader).toBeInTheDocument();
	});

	it("should have loader class", () => {
		const { container } = render(<Loader />);
		const loader = container.querySelector(".loader");
		expect(loader).toBeInTheDocument();
	});

	it("should have aria-label for accessibility", () => {
		render(<Loader />);
		const loader = screen.getByLabelText("Cargando");
		expect(loader).toHaveAttribute("aria-label", "Cargando");
	});
});

