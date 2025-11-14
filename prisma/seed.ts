import "dotenv/config";

import {
	PrismaClient,
	SkillCategory,
	SkillLevel,
	TechnologyCategory,
} from "@prisma/client";

const prisma = new PrismaClient();

const technologiesSeed = [
	{ name: "React.js", category: TechnologyCategory.FRONTEND },
	{ name: "Angular", category: TechnologyCategory.FRONTEND },
	{ name: "AngularJS", category: TechnologyCategory.FRONTEND },
	{ name: "Next.js", category: TechnologyCategory.FRONTEND },
	{ name: "TypeScript", category: TechnologyCategory.FRONTEND },
	{ name: "JavaScript", category: TechnologyCategory.FRONTEND },
	{ name: "Redux", category: TechnologyCategory.TOOLING },
	{ name: "PrimeNG", category: TechnologyCategory.FRONTEND },
	{ name: "Sass", category: TechnologyCategory.FRONTEND },
	{ name: "CSS-in-JS", category: TechnologyCategory.FRONTEND },
	{ name: "Webpack", category: TechnologyCategory.TOOLING },
	{ name: "Node.js", category: TechnologyCategory.BACKEND },
	{ name: "Express", category: TechnologyCategory.BACKEND },
	{ name: "PHP", category: TechnologyCategory.BACKEND },
	{ name: ".NET", category: TechnologyCategory.BACKEND },
	{ name: "Java", category: TechnologyCategory.BACKEND },
	{ name: "MySQL", category: TechnologyCategory.DATABASE },
	{ name: "MongoDB", category: TechnologyCategory.DATABASE },
	{ name: "SQL Server", category: TechnologyCategory.DATABASE },
	{ name: "Kotlin", category: TechnologyCategory.MOBILE },
	{ name: "Swift", category: TechnologyCategory.MOBILE },
	{ name: "React Native", category: TechnologyCategory.MOBILE },
	{ name: "Foundation", category: TechnologyCategory.FRONTEND },
	{ name: "Materialize", category: TechnologyCategory.FRONTEND },
	{ name: "Bootstrap", category: TechnologyCategory.FRONTEND },
	{ name: "MeteorJS", category: TechnologyCategory.BACKEND },
	{ name: "Figma", category: TechnologyCategory.DESIGN },
	{ name: "Storybook", category: TechnologyCategory.TOOLING },
	{ name: "GitHub", category: TechnologyCategory.TOOLING },
	{ name: "Bitbucket", category: TechnologyCategory.TOOLING },
] as const;

const skillsSeed = [
	{
		name: "Clean Architecture",
		category: SkillCategory.OTHER,
		level: SkillLevel.EXPERT,
		highlight: true,
	},
	{
		name: "Atomic Design",
		category: SkillCategory.DESIGN,
		level: SkillLevel.EXPERT,
		highlight: true,
	},
	{
		name: "Micro-Frontends",
		category: SkillCategory.FRONTEND,
		level: SkillLevel.EXPERT,
		highlight: true,
	},
	{
		name: "SOLID",
		category: SkillCategory.OTHER,
		level: SkillLevel.EXPERT,
		highlight: true,
	},
	{
		name: "Responsive Design",
		category: SkillCategory.DESIGN,
		level: SkillLevel.EXPERT,
		highlight: false,
	},
	{
		name: "UX/UI Collaboration",
		category: SkillCategory.DESIGN,
		level: SkillLevel.ADVANCED,
		highlight: false,
	},
	{
		name: "Mentoría técnica",
		category: SkillCategory.MANAGEMENT,
		level: SkillLevel.ADVANCED,
		highlight: false,
	},
] as const;

const experiencesSeed = [
	{
		companyName: "Smart Payment Services",
		companyWebsite:
			"https://shell.dev.stg.smartpayment.com.mx/admin-login/sign-in",
		companyLocation: "Ciudad de México, México",
		roleTitle: "Frontend Developer",
		description:
			"Desarrollo de plataformas de pago y micro-frontends para soluciones financieras de pagos digitales.",
		startDate: new Date("2024-04-01"),
		endDate: new Date("2025-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo en React.js, Angular.js, JavaScript, Redux y PrimeNG para módulos críticos del sistema.",
			"Implementación y mantenimiento de micro-frontends para escalar nuevos productos sin afectar el core.",
			"Integración de servicios en múltiples plataformas asegurando consistencia y observabilidad.",
			"Desarrollo de una plataforma de pagos mediante liga directa para clientes empresariales.",
		],
		projects: [
			{
				name: "Portal de pagos por liga directa",
				description:
					"Panel administrativo para generar y monitorear ligas de pago personalizadas.",
				url: "https://shell.dev.stg.smartpayment.com.mx/admin-login/sign-in",
			},
		],
		technologies: [
			"React.js",
			"AngularJS",
			"JavaScript",
			"Redux",
			"PrimeNG",
			"TypeScript",
		],
	},
	{
		companyName: "Amco",
		companyWebsite: "https://www.claromusica.com",
		companyLocation: "Ciudad de México, México",
		roleTitle: "Frontend Developer",
		description:
			"Construcción y mejora de plataformas de entretenimiento digital con enfoque en performance y experiencia de usuario.",
		startDate: new Date("2020-03-01"),
		endDate: new Date("2024-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo y evolución de Claro Música y Claro Video con React.js, Redux, SASS y JavaScript.",
			"Integración de servicios web y optimización de funcionalidades para mercados de alto tráfico.",
			"Desarrollo de aplicaciones Smart TV basadas en tecnologías web para Claro Video.",
		],
		projects: [
			{
				name: "Claro Música",
				description:
					"Actualización continua de la plataforma de streaming musical para LATAM.",
				url: "https://www.claromusica.com",
			},
			{
				name: "Aplicación Claro Video Smart TV",
				description:
					"Aplicación para Smart TV con distribución regional y soporte multidispositivo.",
				url: null,
			},
		],
		technologies: [
			"React.js",
			"Redux",
			"Sass",
			"JavaScript",
			"Webpack",
			"TypeScript",
		],
	},
	{
		companyName: "MAYAHII",
		companyWebsite: null,
		companyLocation: "Ciudad de México, México",
		roleTitle: "Frontend Developer",
		description:
			"Diseño y construcción de productos digitales con foco en performance, componentización y experiencia de usuario.",
		startDate: new Date("2018-10-01"),
		endDate: new Date("2020-03-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo en React.js, Redux, Webpack y CSS-in-JS para productos digitales de alto impacto.",
			"Maquetación de mockups y análisis para la integración de servicios REST.",
			"Optimización de la experiencia de usuario y métricas de conversión.",
		],
		projects: [],
		technologies: ["React.js", "Redux", "Webpack", "CSS-in-JS", "JavaScript"],
	},
	{
		companyName: "Capital Online",
		companyWebsite: null,
		companyLocation: "Ciudad de México, México",
		roleTitle: "Fullstack Developer",
		description:
			"Implementación de soluciones web y móviles para campañas digitales, landing pages y sistemas internos.",
		startDate: new Date("2017-06-01"),
		endDate: new Date("2018-08-01"),
		isCurrent: false,
		responsibilities: [
			"Implementación de sistemas de gestión y recopilación de datos para áreas comerciales.",
			"Desarrollo de landing pages y CMS personalizados con integración completa frontend/backend.",
			"Publicación de aplicaciones móviles en Play Store utilizando stack híbrido.",
		],
		projects: [
			{
				name: "Landing pages y CMS multicliente",
				description:
					"Ecosistema de landings y CMS administrables para campañas masivas.",
				url: null,
			},
			{
				name: "Aplicaciones móviles Xeror y Sura",
				description:
					"Aplicaciones móviles híbridas publicadas en Play Store para clientes corporativos.",
				url: null,
			},
		],
		technologies: [
			"Angular",
			"MeteorJS",
			"Foundation",
			"Materialize",
			"Bootstrap",
			"Sass",
			"JavaScript",
			"React Native",
		],
	},
	{
		companyName: "Mandarina Digital",
		companyWebsite: null,
		companyLocation: "Ciudad de México, México",
		roleTitle: "Desarrollador de Software",
		description:
			"Desarrollo integral de sitios web y aplicaciones móviles para clientes corporativos.",
		startDate: new Date("2015-08-01"),
		endDate: new Date("2017-03-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo de páginas web (landing pages) con stack fullstack.",
			"Construcción de aplicaciones móviles y diseño de interfaces visuales.",
			"Migración de soluciones heredadas en .NET hacia entornos web modernos.",
		],
		projects: [
			{
				name: "Migración .NET a Web",
				description:
					"Transformación de aplicaciones internas a arquitecturas web modernas.",
				url: null,
			},
			{
				name: "App Misas en Vivo",
				description:
					"Aplicación móvil publicada en la App Store para transmisión de eventos en vivo.",
				url: "https://itunes.apple.com/mx/app/misas-en-vivo/id1076018377?mt=8",
			},
		],
		technologies: ["PHP", ".NET", "JavaScript", "Bootstrap", "Swift", "Kotlin"],
	},
	{
		companyName: "Solucionic",
		companyWebsite: null,
		companyLocation: "Ciudad de México, México",
		roleTitle: "Programador / Tester / Mesa de servicio",
		description:
			"Soporte y evolución de sistemas contables y de nómina con foco en estabilidad operativa.",
		startDate: new Date("2013-12-01"),
		endDate: new Date("2015-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo y mantenimiento de sistemas contables y de nómina.",
			"Implementación de facturación electrónica (CFDI) conforme a normativas fiscales.",
			"Gestión de mesa de servicio y liderazgo de un equipo de soporte.",
		],
		projects: [],
		technologies: [".NET", "SQL Server", "Java"],
	},
] as const;

async function resetDatabase() {
	await prisma.experienceTechnology.deleteMany();
	await prisma.userTechnology.deleteMany();
	await prisma.userSkill.deleteMany();
	await prisma.experienceResponsibility.deleteMany();
	await prisma.experienceProject.deleteMany();
	await prisma.experience.deleteMany();
	await prisma.technology.deleteMany();
	await prisma.skill.deleteMany();
	await prisma.user.deleteMany();
}

async function main() {
	await resetDatabase();

	const user = await prisma.user.create({
		data: {
			firstName: "José Ángel",
			lastName: "Rodríguez Martínez",
			fullName: "José Ángel Rodríguez Martínez",
			headline:
				"Frontend Developer | Ingeniero en Sistemas Computacionales | 33 años",
			summary:
				"Ingeniero en Sistemas Computacionales con 9 años de experiencia como Frontend Developer y soporte de sistemas. Especializado en React.js, Angular y arquitecturas modernas como Micro-Frontends, Clean Architecture y Atomic Design. Perfil creativo, adaptable y orientado a resultados, con pasión por el desarrollo web y la programación.",
			birthDate: null,
			locationCity: "Ciudad de México",
			locationRegion: "Alcaldía Gustavo A. Madero",
			country: "México",
			email: "rodriguez_1409@hotmail.com",
			phone: "5510484629",
			githubUrl: "https://github.com/AngeelRdz",
			linkedinUrl: "https://www.linkedin.com/in/jose-angel-rodz-755923141/",
		},
	});

	const technologyRecords = await Promise.all(
		technologiesSeed.map((technology) =>
			prisma.technology.upsert({
				where: { name: technology.name },
				update: { category: technology.category },
				create: technology,
			})
		)
	);

	const technologyMap = new Map(
		technologyRecords.map((tech) => [tech.name, tech])
	);

	const skillRecords = await Promise.all(
		skillsSeed.map((skill) =>
			prisma.skill.upsert({
				where: { name: skill.name },
				update: { category: skill.category },
				create: {
					name: skill.name,
					category: skill.category,
				},
			})
		)
	);

	const skillMap = new Map(skillRecords.map((skill) => [skill.name, skill]));

	for (const skill of skillsSeed) {
		const skillEntity = skillMap.get(skill.name);
		if (!skillEntity) continue;

		await prisma.userSkill.create({
			data: {
				userId: user.id,
				skillId: skillEntity.id,
				level: skill.level,
				highlight: skill.highlight,
			},
		});
	}

	for (const experience of experiencesSeed) {
		const createdExperience = await prisma.experience.create({
			data: {
				userId: user.id,
				companyName: experience.companyName,
				companyWebsite: experience.companyWebsite,
				companyLocation: experience.companyLocation,
				roleTitle: experience.roleTitle,
				description: experience.description,
				startDate: experience.startDate,
				endDate: experience.endDate,
				isCurrent: experience.isCurrent,
				responsibilities: {
					create: experience.responsibilities.map((description, index) => ({
						description,
						order: index + 1,
					})),
				},
				projects: {
					create: experience.projects.map((project, index) => ({
						name: project.name,
						description: project.description ?? null,
						url: project.url ?? null,
						order: index + 1,
					})),
				},
			},
		});

		const experienceTechnologies = experience.technologies
			.map((technologyName) => {
				const technology = technologyMap.get(technologyName);
				if (!technology) {
					console.warn(
						`Tecnología "${technologyName}" no encontrada en el mapa.`
					);
				}
				return technology;
			})
			.filter(Boolean);

		for (const technology of experienceTechnologies) {
			await prisma.experienceTechnology.create({
				data: {
					experienceId: createdExperience.id,
					technologyId: technology!.id,
				},
			});
		}
	}

	const userTechnologies = [
		"React.js",
		"Next.js",
		"Angular",
		"AngularJS",
		"TypeScript",
		"JavaScript",
		"Redux",
		"PrimeNG",
		"Sass",
		"CSS-in-JS",
		"Webpack",
		"Node.js",
		"Express",
		"PHP",
		".NET",
		"Java",
		"MySQL",
		"MongoDB",
		"SQL Server",
		"Kotlin",
		"Swift",
		"React Native",
		"Figma",
		"Storybook",
		"GitHub",
		"Bitbucket",
	] as const;

	for (const technologyName of userTechnologies) {
		const technology = technologyMap.get(technologyName);
		if (!technology) continue;

		await prisma.userTechnology.create({
			data: {
				userId: user.id,
				technologyId: technology.id,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
		console.info("Base de datos inicializada con éxito.");
	})
	.catch(async (error) => {
		console.error("Error al inicializar la base de datos:", error);
		await prisma.$disconnect();
		process.exit(1);
	});
