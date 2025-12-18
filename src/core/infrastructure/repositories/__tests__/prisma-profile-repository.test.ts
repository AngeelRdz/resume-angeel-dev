import { PrismaProfileRepository } from "../prisma-profile-repository";
import type { PrismaClient } from "@prisma/client";

describe("PrismaProfileRepository", () => {
	let repository: PrismaProfileRepository;
	let mockPrisma: jest.Mocked<PrismaClient>;

	beforeEach(() => {
		mockPrisma = {
			user: {
				findFirst: jest.fn() as jest.MockedFunction<
					PrismaClient["user"]["findFirst"]
				>,
			},
		} as unknown as jest.Mocked<PrismaClient>;

		repository = new PrismaProfileRepository(mockPrisma);
	});

	it("should return null when user not found", async () => {
		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(null);

		const result = await repository.getProfile();

		expect(result).toBeNull();
		expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
			where: undefined,
			include: expect.any(Object),
			orderBy: expect.any(Object),
		});
	});

	it("should return profile when user found", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result).toBeDefined();
		expect(result?.personalInfo.fullName).toBe("John Doe");
		expect(result?.personalInfo.contact.email).toBe("test@example.com");
	});

	it("should filter by userId when provided", async () => {
		const userId = "user-123";
		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(null);

		await repository.getProfile({ userId });

		expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
			where: { id: userId },
			include: expect.any(Object),
			orderBy: expect.any(Object),
		});
	});

	it("should map experiences correctly", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [
				{
					id: "exp-1",
					companyName: "Company",
					companyWebsite: "https://company.com",
					companyLocation: "Location",
					roleTitle: "Developer",
					description: "Description",
					startDate: new Date("2020-01-01"),
					endDate: new Date("2022-01-01"),
					isCurrent: false,
					createdAt: new Date(),
					updatedAt: new Date(),
					responsibilities: [
						{
							id: "resp-1",
							description: "Responsibility 1",
							order: 0,
						},
					],
					projects: [],
					technologies: [],
				},
			],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.experiences).toHaveLength(1);
		expect(result?.experiences[0].companyName).toBe("Company");
		expect(result?.experiences[0].responsibilities).toContain(
			"Responsibility 1"
		);
	});

	it("should map skills correctly", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [
				{
					skill: {
						id: "skill-1",
						name: "React",
						category: "frontend",
					},
					level: "advanced",
					highlight: true,
				},
			],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.skills).toHaveLength(1);
		expect(result?.skills[0].name).toBe("React");
		expect(result?.skills[0].highlight).toBe(true);
	});

	it("should map technologies correctly", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [],
			technologies: [
				{
					technology: {
						id: "tech-1",
						name: "TypeScript",
						category: "language",
						iconName: "typescript",
					},
				},
			],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.technologies).toHaveLength(1);
		expect(result?.technologies[0].name).toBe("TypeScript");
		expect(result?.technologies[0].iconName).toBe("typescript");
	});

	it("should map experience with projects and technologies", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [
				{
					id: "exp-1",
					companyName: "Company",
					companyWebsite: "https://company.com",
					companyLocation: "Location",
					roleTitle: "Developer",
					description: "Description",
					startDate: new Date("2020-01-01"),
					endDate: null,
					isCurrent: true,
					createdAt: new Date(),
					updatedAt: new Date(),
					responsibilities: [
						{
							id: "resp-1",
							description: "Responsibility 1",
							order: 1,
						},
						{
							id: "resp-2",
							description: "Responsibility 2",
							order: 0,
						},
					],
					projects: [
						{
							id: "proj-1",
							name: "Project 1",
							description: "Project description",
							url: "https://project.com",
							order: 0,
						},
					],
					technologies: [
						{
							technology: {
								id: "tech-1",
								name: "React",
								category: "framework",
								iconName: "react",
							},
						},
					],
				},
			],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.experiences[0].projects).toHaveLength(1);
		expect(result?.experiences[0].projects[0].name).toBe("Project 1");
		expect(result?.experiences[0].technologies).toHaveLength(1);
		expect(result?.experiences[0].technologies[0].name).toBe("React");
		// Verificar que las responsabilidades están ordenadas
		expect(result?.experiences[0].responsibilities[0]).toBe("Responsibility 2");
		expect(result?.experiences[0].responsibilities[1]).toBe("Responsibility 1");
	});

	it("should handle null values correctly", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: new Date("1990-01-01"),
			locationCity: "City",
			locationRegion: "Region",
			country: "Country",
			email: "test@example.com",
			phone: "123456789",
			githubUrl: "https://github.com",
			linkedinUrl: "https://linkedin.com",
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.personalInfo.birthDate).toBe("1990-01-01T00:00:00.000Z");
		expect(result?.personalInfo.location.region).toBe("Region");
		expect(result?.personalInfo.contact.phone).toBe("123456789");
		expect(result?.personalInfo.contact.github).toBe("https://github.com");
		expect(result?.personalInfo.contact.linkedin).toBe("https://linkedin.com");
	});

	it("should handle null birthDate", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.personalInfo.birthDate).toBeNull();
		expect(result?.personalInfo.location.region).toBeNull();
		expect(result?.personalInfo.contact.phone).toBeNull();
		expect(result?.personalInfo.contact.github).toBeNull();
		expect(result?.personalInfo.contact.linkedin).toBeNull();
	});

	it("should sort experiences by startDate descending", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [
				{
					id: "exp-1",
					companyName: "Company 1",
					companyWebsite: null,
					companyLocation: null,
					roleTitle: "Developer",
					description: null,
					startDate: new Date("2020-01-01"),
					endDate: null,
					isCurrent: false,
					createdAt: new Date(),
					updatedAt: new Date(),
					responsibilities: [],
					projects: [],
					technologies: [],
				},
				{
					id: "exp-2",
					companyName: "Company 2",
					companyWebsite: null,
					companyLocation: null,
					roleTitle: "Senior Developer",
					description: null,
					startDate: new Date("2022-01-01"),
					endDate: null,
					isCurrent: true,
					createdAt: new Date(),
					updatedAt: new Date(),
					responsibilities: [],
					projects: [],
					technologies: [],
				},
			],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.experiences).toHaveLength(2);
		expect(result?.experiences[0].companyName).toBe("Company 2");
		expect(result?.experiences[1].companyName).toBe("Company 1");
	});

	it("should sort skills by highlight first, then by name", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [
				{
					skill: {
						id: "skill-1",
						name: "Zebra",
						category: "other",
					},
					level: null,
					highlight: false,
				},
				{
					skill: {
						id: "skill-2",
						name: "React",
						category: "frontend",
					},
					level: "advanced",
					highlight: true,
				},
				{
					skill: {
						id: "skill-3",
						name: "Angular",
						category: "frontend",
					},
					level: "intermediate",
					highlight: true,
				},
			],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.skills).toHaveLength(3);
		expect(result?.skills[0].name).toBe("Angular");
		expect(result?.skills[1].name).toBe("React");
		expect(result?.skills[2].name).toBe("Zebra");
	});

	it("should sort technologies by name", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [],
			skills: [],
			technologies: [
				{
					technology: {
						id: "tech-1",
						name: "Zebra",
						category: "other",
						iconName: null,
					},
				},
				{
					technology: {
						id: "tech-2",
						name: "React",
						category: "framework",
						iconName: "react",
					},
				},
			],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.technologies).toHaveLength(2);
		expect(result?.technologies[0].name).toBe("React");
		expect(result?.technologies[1].name).toBe("Zebra");
	});

	it("should handle experience with null endDate", async () => {
		const mockUser = {
			id: "user-1",
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Engineer",
			summary: "Summary",
			profileImageUrl: null,
			birthDate: null,
			locationCity: "City",
			locationRegion: null,
			country: "Country",
			email: "test@example.com",
			phone: null,
			githubUrl: null,
			linkedinUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			experiences: [
				{
					id: "exp-1",
					companyName: "Company",
					companyWebsite: null,
					companyLocation: null,
					roleTitle: "Developer",
					description: null,
					startDate: new Date("2020-01-01"),
					endDate: null,
					isCurrent: true,
					createdAt: new Date(),
					updatedAt: new Date(),
					responsibilities: [],
					projects: [],
					technologies: [],
				},
			],
			skills: [],
			technologies: [],
		};

		(
			mockPrisma.user.findFirst as jest.MockedFunction<
				PrismaClient["user"]["findFirst"]
			>
		).mockResolvedValue(
			mockUser as Awaited<ReturnType<PrismaClient["user"]["findFirst"]>>
		);

		const result = await repository.getProfile();

		expect(result?.experiences[0].endDate).toBeNull();
		expect(result?.experiences[0].isCurrent).toBe(true);
	});
});
