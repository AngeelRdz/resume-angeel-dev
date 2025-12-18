import "dotenv/config";

import {
	PrismaClient,
	SkillCategory,
	SkillLevel,
	TechnologyCategory,
} from "@prisma/client";

const prisma = new PrismaClient();

const technologiesSeed = [
	{
		name: "React.js",
		category: TechnologyCategory.FRONTEND,
		iconName: "react",
	},
	{
		name: "Angular",
		category: TechnologyCategory.FRONTEND,
		iconName: "angular",
	},
	{
		name: "AngularJS",
		category: TechnologyCategory.FRONTEND,
		iconName: "angular",
	},
	{
		name: "Next.js",
		category: TechnologyCategory.FRONTEND,
		iconName: "nextjs",
	},
	{
		name: "TypeScript",
		category: TechnologyCategory.FRONTEND,
		iconName: "typescript",
	},
	{
		name: "JavaScript",
		category: TechnologyCategory.FRONTEND,
		iconName: "javascript",
	},
	{ name: "Redux", category: TechnologyCategory.TOOLING, iconName: "redux" },
	{
		name: "PrimeNG",
		category: TechnologyCategory.FRONTEND,
		iconName: "angular",
	},
	{ name: "Sass", category: TechnologyCategory.FRONTEND, iconName: "sass" },
	{
		name: "CSS-in-JS",
		category: TechnologyCategory.FRONTEND,
		iconName: "cssinjs",
	},
	{
		name: "Webpack",
		category: TechnologyCategory.TOOLING,
		iconName: "webpack",
	},
	{ name: "Node.js", category: TechnologyCategory.BACKEND, iconName: "nodejs" },
	{
		name: "Express",
		category: TechnologyCategory.BACKEND,
		iconName: "express",
	},
	{ name: "PHP", category: TechnologyCategory.BACKEND, iconName: "php" },
	{ name: ".NET", category: TechnologyCategory.BACKEND, iconName: "dotnet" },
	{ name: "Java", category: TechnologyCategory.BACKEND, iconName: "java" },
	{ name: "MySQL", category: TechnologyCategory.DATABASE, iconName: "mysql" },
	{
		name: "MongoDB",
		category: TechnologyCategory.DATABASE,
		iconName: "mongodb",
	},
	{
		name: "SQL Server",
		category: TechnologyCategory.DATABASE,
		iconName: "sqlserver",
	},
	{ name: "Kotlin", category: TechnologyCategory.MOBILE, iconName: "kotlin" },
	{ name: "Swift", category: TechnologyCategory.MOBILE, iconName: "swift" },
	{
		name: "React Native",
		category: TechnologyCategory.MOBILE,
		iconName: "reactnative",
	},
	{
		name: "Foundation",
		category: TechnologyCategory.FRONTEND,
		iconName: "foundation",
	},
	{
		name: "Materialize",
		category: TechnologyCategory.FRONTEND,
		iconName: "materialize",
	},
	{
		name: "Bootstrap",
		category: TechnologyCategory.FRONTEND,
		iconName: "bootstrap",
	},
	{
		name: "MeteorJS",
		category: TechnologyCategory.BACKEND,
		iconName: "meteor",
	},
	{ name: "Figma", category: TechnologyCategory.DESIGN, iconName: "figma" },
	{
		name: "Storybook",
		category: TechnologyCategory.TOOLING,
		iconName: "storybook",
	},
	{ name: "GitHub", category: TechnologyCategory.TOOLING, iconName: "github" },
	{
		name: "Bitbucket",
		category: TechnologyCategory.TOOLING,
		iconName: "bitbucket",
	},
	{ name: "Jest", category: TechnologyCategory.TOOLING, iconName: "jest" },
	{ name: "GCP", category: TechnologyCategory.TOOLING, iconName: "gcp" },
	{
		name: "Jenkins",
		category: TechnologyCategory.TOOLING,
		iconName: "jenkins",
	},
	{ name: "Git", category: TechnologyCategory.TOOLING, iconName: "git" },
	{ name: "Docker", category: TechnologyCategory.TOOLING, iconName: "docker" },
	{ name: "CI/CD", category: TechnologyCategory.TOOLING, iconName: "cicd" },
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
		companyName: "Envia Ya",
		companyWebsite: "https://enviaya.com.mx/es",
		companyLocation: "México",
		roleTitle: "Frontend Developer",
		description:
			"Desarrollo de interfaces Frontend utilizando React.js, Next.js, Storybook y principios de Atomic Design, garantizando componentes escalables, reutilizables y mantenibles.",
		startDate: new Date("2025-05-01"),
		endDate: null,
		isCurrent: true,
		responsibilities: [
			"Desarrollo de interfaces Frontend utilizando React.js, Next.js, Storybook y principios de Atomic Design, garantizando componentes escalables, reutilizables y mantenibles.",
			"Implementación, optimización y mantenimiento de la plataforma aplicando Clean Architecture y principios SOLID, asegurando código modular, claro y de alta calidad.",
			"Integración y consumo de servicios RESTful alojados en AWS y Google Cloud Platform, manejando autenticación, validación de datos, optimización de rendimiento y manejo de errores.",
			"Creación y documentación de componentes UI en Storybook, fortaleciendo el Design System con elementos consistentes, accesibles y listos para producción.",
			"Colaboración en procesos de despliegue mediante Git, Jenkins, Docker y pipelines de CI/CD, agilizando lanzamientos y mejorando la estabilidad.",
			"Desarrollo y validación de pruebas automatizadas con Jest, aumentando la confiabilidad y reduciendo regresiones en módulos críticos.",
			"Apoyo en tareas backend utilizando Node.js, Express y MongoDB para debugging, validación de endpoints e integración entre servicios.",
		],
		projects: [
			{
				name: "@angel-storybook/design-system",
				description:
					"Paquete NPM con componentes del Design System documentados en Storybook.",
				url: "https://www.npmjs.com/package/@angel-storybook/design-system",
			},
			{
				name: "Platform Envia Ya (Staging)",
				description: "Plataforma de gestión de envíos en ambiente de staging.",
				url: "https://platform.stg.enviaya.com.mx",
			},
			{
				name: "Envia Ya",
				description: "Plataforma principal de envíos de Envia Ya.",
				url: "https://enviaya.com.mx/es",
			},
		],
		technologies: [
			"React.js",
			"Next.js",
			"Storybook",
			"TypeScript",
			"Node.js",
			"Express",
			"MongoDB",
			"Jest",
			"GCP",
			"Jenkins",
			"Git",
			"Docker",
			"CI/CD",
		],
	},
	{
		companyName: "Smart Payment Services",
		companyWebsite:
			"https://shell.dev.stg.smartpayment.com.mx/admin-login/sign-in",
		companyLocation: "México",
		roleTitle: "Frontend Developer",
		description:
			"Desarrollo Frontend con Next.js, React.js, AngularJS, JavaScript, Redux y PrimeNG, contribuyendo a aplicaciones escalables y de alto rendimiento.",
		startDate: new Date("2024-04-01"),
		endDate: new Date("2025-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo Frontend con Next.js, React.js, AngularJS, JavaScript, Redux y PrimeNG, contribuyendo a aplicaciones escalables y de alto rendimiento.",
			"Implementación y mantenimiento de micro-frontends para distintos módulos del sistema, favoreciendo la modularidad y los despliegues independientes.",
			"Integración de RESTful APIs en múltiples plataformas, asegurando comunicación segura, estable y eficiente entre servicios.",
			"Desarrollo de una plataforma de pagos mediante liga directa para clientes, incluyendo diseño de interfaz, manejo de autenticación y orquestación de servicios.",
			"Uso de Node.js, Express y MongoDB para soporte en integraciones backend y verificación de consistencia en los endpoints consumidos por el frontend.",
			"Ejecución de pruebas unitarias y de integración con Jest, aumentando la cobertura y estabilidad en módulos relacionados con pagos.",
			"Uso de servicios en la nube con GCP y configuración de pipelines de CI/CD (Git, Jenkins, Docker) para automatizar builds y optimizar los tiempos de despliegue.",
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
			"Next.js",
			"AngularJS",
			"JavaScript",
			"Redux",
			"PrimeNG",
			"TypeScript",
			"Node.js",
			"Express",
			"MongoDB",
			"Jest",
			"GCP",
			"Jenkins",
			"Git",
			"Docker",
			"CI/CD",
		],
	},
	{
		companyName: "Amco",
		companyWebsite: "https://www.claromusica.com",
		companyLocation: "México",
		roleTitle: "Frontend Developer",
		description:
			"Desarrollo y mejora de plataformas Claro Música y Claro Video.",
		startDate: new Date("2020-03-01"),
		endDate: new Date("2024-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo y mejora de plataformas Claro Música y Claro Video.",
			"Integración de servicios web y optimización de funcionalidades.",
			"Desarrollo en React.js, Redux, SASS y JavaScript.",
			"Creación de aplicaciones para Smart TV (Claro Video).",
		],
		projects: [
			{
				name: "Claro Música",
				description: "Plataforma de streaming musical para LATAM.",
				url: "https://www.claromusica.com",
			},
			{
				name: "Aplicación Claro Video Smart TV",
				description:
					"Aplicación para Smart TV con distribución regional y soporte multidispositivo.",
				url: null,
			},
		],
		technologies: ["React.js", "Redux", "Sass", "JavaScript", "Webpack"],
	},
	{
		companyName: "MAYAHII",
		companyWebsite: null,
		companyLocation: "México",
		roleTitle: "Frontend Developer",
		description: "Desarrollo en React.js, Redux, Webpack y CSS-in-JS.",
		startDate: new Date("2018-10-01"),
		endDate: new Date("2020-03-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo en React.js, Redux, Webpack y CSS-in-JS.",
			"Maquetación de mockups y análisis de integración de servicios.",
			"Optimización de la experiencia de usuario en productos digitales.",
		],
		projects: [],
		technologies: ["React.js", "Redux", "Webpack", "CSS-in-JS", "JavaScript"],
	},
	{
		companyName: "Capital Online",
		companyWebsite: null,
		companyLocation: "México",
		roleTitle: "Fullstack Developer",
		description:
			"Implementación de sistemas de gestión y recopilación de datos.",
		startDate: new Date("2017-06-01"),
		endDate: new Date("2018-08-01"),
		isCurrent: false,
		responsibilities: [
			"Implementación de sistemas de gestión y recopilación de datos.",
			"Desarrollo de landing pages y CMS (frontend y backend).",
			"Desarrollo de aplicaciones móviles publicadas en Play Store.",
			"Uso de Angular, MeteorJS, Foundation, Materialize, Bootstrap y SASS.",
		],
		projects: [
			{
				name: "Implementación en desarrollo web",
				description:
					"Implementación en desarrollo web utilizando frameworks como Angular y Meteor JS para el frontend. Además de usar Foundation, Materialize y Bootstrap. Así como el manejo de SASS y JavaScript.",
				url: null,
			},
			{
				name: "Aplicaciones móviles Xerox y Sura",
				description:
					"Aplicaciones móviles en la Play Store que en ese momento se publicaron como Xerox, Sura.",
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
		companyLocation: "México",
		roleTitle: "Desarrollador de Software",
		description:
			"Desarrollo de páginas web (Landing pages) - Frontend y Backend.",
		startDate: new Date("2015-08-01"),
		endDate: new Date("2017-03-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo de páginas web (Landing pages) - Frontend y Backend.",
			"Desarrollo de aplicaciones móviles.",
			"Diseño de interfaces de usuario gráficas (UX).",
		],
		projects: [
			{
				name: "Migración de desarrollo en .NET a desarrollo Web",
				description:
					"Migración de desarrollo en .NET a desarrollo Web en 6 meses.",
				url: null,
			},
			{
				name: "App Misas en Vivo",
				description: "Aplicaciones móviles en la App Store.",
				url: "https://itunes.apple.com/mx/app/misas-en-vivo/id1076018377?mt=8",
			},
		],
		technologies: ["PHP", ".NET", "JavaScript", "Bootstrap", "Swift", "Kotlin"],
	},
	{
		companyName: "Solucionic",
		companyWebsite: null,
		companyLocation: "México",
		roleTitle: "Programador - Tester - Mesa de servicio",
		description:
			"Desarrollo y mantenimiento a los sistemas Contables y de Nómina.",
		startDate: new Date("2013-12-01"),
		endDate: new Date("2015-04-01"),
		isCurrent: false,
		responsibilities: [
			"Desarrollo y mantenimiento a los sistemas Contables y de Nómina.",
			"Implementación de facturación electrónica (CFDI).",
			"Responsable de la gestión de sistemas y Mesa de Servicio, liderazgo de un equipo de dos personas.",
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
			profileImageUrl: null, // Agregar URL de tu imagen de perfil aquí
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
				update: {
					category: technology.category,
					iconName: technology.iconName,
				},
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
		"Jest",
		"GCP",
		"Jenkins",
		"Git",
		"Docker",
		"CI/CD",
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
