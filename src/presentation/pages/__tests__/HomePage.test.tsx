import { render, screen, waitFor } from "@testing-library/react";
import { HomePage } from "../HomePage";

// Mock fetch
global.fetch = jest.fn();

// Mock HomeTemplate
jest.mock("@/presentation/components/templates/HomeTemplate", () => ({
	HomeTemplate: ({
		profile,
	}: {
		profile: { name?: string; role?: string; [key: string]: unknown };
	}) => (
		<div data-testid="home-template">
			{profile.name} - {profile.role}
		</div>
	),
}));

// Mock TranslationProvider
jest.mock("@/presentation/providers/TranslationProvider", () => ({
	TranslationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Loader
jest.mock("@/presentation/components/atoms/Loader", () => ({
	Loader: () => <div data-testid="loader">Loading...</div>,
}));

const mockProfile = {
	id: "1",
	name: "John Doe",
	role: "Developer",
	headline: "Building amazing things",
	greeting: "Hello",
	availability: "Available",
	location: "San Francisco",
	profileImageUrl: "https://example.com/image.jpg",
	email: "john@example.com",
	highlights: [],
	actions: [],
	about: {
		title: "About",
		summary: "Summary",
		highlights: [],
		socialLinks: [],
	},
	experience: {
		title: "Experience",
		items: [],
	},
	skills: {
		title: "Skills",
		primaryTitle: "Primary",
		primaryDescription: "Primary skills",
		primarySkills: [],
		complementaryTitle: "Complementary",
		complementaryDescription: "Complementary skills",
		complementarySkills: [],
		valuesTitle: "Values",
		values: [],
	},
	projects: {
		title: "Projects",
		items: [],
	},
	contact: {
		title: "Contact",
		subtitle: "Let's talk",
		email: "john@example.com",
		emailLabel: "Email",
		socialLabel: "Social",
		socials: [],
	},
};

describe("HomePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should render loading state initially", () => {
		(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
		render(<HomePage />);
		expect(screen.getByTestId("loader")).toBeInTheDocument();
		expect(screen.getByText(/Cargando perfil/)).toBeInTheDocument();
	});

	it("should render profile when fetch succeeds", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockProfile }),
		});

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByTestId("home-template")).toBeInTheDocument();
		});

		expect(screen.getByText(/John Doe - Developer/)).toBeInTheDocument();
	});

	it("should render error state when fetch fails", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: false,
			status: 500,
		});

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText(/No pudimos cargar la información/)).toBeInTheDocument();
		});
	});

	it("should handle fetch error", async () => {
		(global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText(/No pudimos cargar la información/)).toBeInTheDocument();
		});

		expect(console.error).toHaveBeenCalled();
	});

	it("should abort fetch on unmount", () => {
		const abortSpy = jest.spyOn(AbortController.prototype, "abort");
		const { unmount } = render(<HomePage />);

		unmount();

		expect(abortSpy).toHaveBeenCalled();
		abortSpy.mockRestore();
	});

	it("should not set error when fetch is aborted", async () => {
		const controller = new AbortController();
		(global.fetch as jest.Mock).mockImplementation(() => {
			controller.abort();
			return Promise.reject(new Error("Aborted"));
		});

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.queryByText(/No pudimos cargar la información/)).not.toBeInTheDocument();
		}, { timeout: 1000 });
	});
});

