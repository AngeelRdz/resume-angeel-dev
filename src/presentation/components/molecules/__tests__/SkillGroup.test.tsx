import { render, screen } from "@testing-library/react";
import { SkillGroup } from "../SkillGroup";

describe("SkillGroup", () => {
	const mockProps = {
		title: "Test Title",
		description: "Test Description",
		items: ["Skill 1", "Skill 2", "Skill 3"],
	};

	it("should render title and description", () => {
		render(<SkillGroup {...mockProps} />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
	});

	it("should render all skill items as badges", () => {
		render(<SkillGroup {...mockProps} />);
		expect(screen.getByText("Skill 1")).toBeInTheDocument();
		expect(screen.getByText("Skill 2")).toBeInTheDocument();
		expect(screen.getByText("Skill 3")).toBeInTheDocument();
	});

	it("should render empty items array", () => {
		render(<SkillGroup {...mockProps} items={[]} />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.queryByText("Skill 1")).not.toBeInTheDocument();
	});

	it("should render single skill item", () => {
		render(<SkillGroup {...mockProps} items={["Only Skill"]} />);
		expect(screen.getByText("Only Skill")).toBeInTheDocument();
	});

	it("should have correct heading level", () => {
		render(<SkillGroup {...mockProps} />);
		const heading = screen.getByRole("heading", { level: 4 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Test Title");
	});
});

