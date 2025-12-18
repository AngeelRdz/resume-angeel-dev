import { render, screen, act } from "@testing-library/react";
import { SkillsSection } from "../SkillsSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

// Mock i18n para evitar warnings de act()
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

// Mock TranslationProvider para evitar warnings de act()
jest.mock("@/presentation/providers/TranslationProvider", () => ({
	TranslationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// framer-motion está mockeado globalmente en jest.setup.js

// Mock SkillGroup
jest.mock("@/presentation/components/molecules/SkillGroup", () => ({
	SkillGroup: ({
		title,
		items,
	}: {
		title: string;
		items: string[];
	}) => (
		<div data-testid={`skill-group-${title}`}>
			<div>{title}</div>
			{items.map((item) => (
				<span key={item}>{item}</span>
			))}
		</div>
	),
}));

const mockSkillsData: HomeViewModel["skills"] = {
	title: "Skills",
	primaryTitle: "Primary",
	primaryDescription: "Primary skills",
	primarySkills: ["React", "TypeScript"],
	complementaryTitle: "Complementary",
	complementaryDescription: "Complementary skills",
	complementarySkills: ["Node.js", "Python"],
	valuesTitle: "Values",
	values: ["Value 1", "Value 2", "Value 3"],
};

describe("SkillsSection", () => {
	beforeEach(() => {
		// Asegurar que el tema esté configurado
		document.documentElement.setAttribute("data-theme", "light");
	});

	it("should render title", () => {
		act(() => {
			render(<SkillsSection data={mockSkillsData} />);
		});
		expect(screen.getByText("Skills")).toBeInTheDocument();
	});

	it("should render primary skill group", () => {
		act(() => {
			render(<SkillsSection data={mockSkillsData} />);
		});
		expect(screen.getByTestId("skill-group-Primary")).toBeInTheDocument();
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});

	it("should render complementary skill group", () => {
		act(() => {
			render(<SkillsSection data={mockSkillsData} />);
		});
		expect(screen.getByTestId("skill-group-Complementary")).toBeInTheDocument();
		expect(screen.getByText("Node.js")).toBeInTheDocument();
		expect(screen.getByText("Python")).toBeInTheDocument();
	});

	it("should render values section", () => {
		act(() => {
			render(<SkillsSection data={mockSkillsData} />);
		});
		expect(screen.getByText("Values")).toBeInTheDocument();
		expect(screen.getByText("Value 1")).toBeInTheDocument();
		expect(screen.getByText("Value 2")).toBeInTheDocument();
		expect(screen.getByText("Value 3")).toBeInTheDocument();
	});

	it("should not render values list when values array is empty", () => {
		const dataWithoutValues = {
			...mockSkillsData,
			values: [],
		};
		act(() => {
			render(<SkillsSection data={dataWithoutValues} />);
		});
		expect(screen.getByText("Values")).toBeInTheDocument();
		expect(screen.queryByText("Value 1")).not.toBeInTheDocument();
	});

	it("should handle non-array values gracefully", () => {
		const dataWithInvalidValues = {
			...mockSkillsData,
			values: null as unknown as string[],
		};
		act(() => {
			render(<SkillsSection data={dataWithInvalidValues} />);
		});
		expect(screen.getByText("Values")).toBeInTheDocument();
		expect(screen.queryByText("Value 1")).not.toBeInTheDocument();
	});
});

