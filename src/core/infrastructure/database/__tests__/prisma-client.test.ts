import { createPrismaClient } from "../prisma-client";
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
jest.mock("@prisma/client", () => ({
	PrismaClient: jest.fn().mockImplementation(() => ({
		$connect: jest.fn(),
		$disconnect: jest.fn(),
		user: {
			findFirst: jest.fn(),
		},
	})),
}));

describe("prisma-client", () => {
	describe("createPrismaClient", () => {
		it("should create a new PrismaClient instance", () => {
			const client = createPrismaClient();
			expect(client).toBeDefined();
			expect(PrismaClient).toHaveBeenCalled();
		});

		it("should create different instances on each call", () => {
			const client1 = createPrismaClient();
			const client2 = createPrismaClient();
			expect(client1).not.toBe(client2);
		});
	});
});

