import { writable, derived } from 'svelte/store';
import type { PortfolioPageData } from '$lib/types/portfolio';

// Navigation state store
export const activeSection = writable<string>('hero');

// Portfolio data store
export const portfolioData = writable<PortfolioPageData>({
	hero: {
		name: 'Marcus Radder',
		title: 'Software Engineer with Leadership Experience',
		subtitle: 'Systems Architect',
		tagline: 'Building scalable solutions with cloud-native technologies',
		ctaText: 'View My Work',
		ctaLink: '#projects'
	},
	about: {
		heading: 'About Me',
		narrative: `I'm currently a Systems Architect, where I design architectural solutions that enable system interoperability across diverse environments. My days involve collaborating with software, cloud, and data team leads to tackle complex challenges like dynamic resource provisioning and hybrid deployment scenarios.

My path here started as an Intelligence Analyst with the U.S. Army, where I learned that the best solutions come from teams where everyone shows up ready to contribute. Whether it's architecting cloud migrations or mentoring engineers, I believe in the power of collective ownership—no rockstars required, just people who care about the work and each other.

I thrive in environments where learning is encouraged, coaching is welcomed, and everyone brings their best effort every day. Because at the end of the day, great software is a team sport.`,
		highlights: [
			'Designing architectural solutions for multi-environment system interoperability',
			'Leading cloud migration projects with zero-downtime deployments',
			'Architecting platforms that serve mission critical applications',
			'Mentoring engineers across diverse technology stacks and experience levels'
		]
	},
	skills: {
		heading: 'Technical Skills',
		categories: [
			{
				name: 'Programming Languages',
				displayOrder: 1,
				skills: [
					{ name: 'Python', proficiency: 'Advanced', yearsExperience: 6 },
					{ name: 'TypeScript', proficiency: 'Advanced', yearsExperience: 5 },
					{ name: 'Go', proficiency: 'Familiar', yearsExperience: 1 }
				]
			},
			{
				name: 'Cloud Platforms',
				displayOrder: 2,
				skills: [
					{ name: 'Azure', proficiency: 'Advanced', yearsExperience: 3 },
					{ name: 'AWS', proficiency: 'Advanced', yearsExperience: 4 }
				]
			},
			{
				name: 'DevOps & Tools',
				displayOrder: 3,
				skills: [
					{ name: 'Docker', proficiency: 'Expert', yearsExperience: 5 },
					{ name: 'GitLab CI/CD', proficiency: 'Advanced', yearsExperience: 4 },
					{ name: 'PostgreSQL', proficiency: 'Advanced', yearsExperience: 6 },
					{ name: 'MongoDB', proficiency: 'Advanced', yearsExperience: 4 },
					{ name: 'Tailwind CSS', proficiency: 'Expert', yearsExperience: 3 },
					{ name: 'Figma', proficiency: 'Advanced', yearsExperience: 3 }
				]
			}
		]
	},
	experience: {
		heading: 'Professional Experience',
		positions: [
			{
				title: 'Systems Architect',
				company: 'Occam Solutions',
				location: 'Remote',
				startDate: '2024-11',
				endDate: 'Present',
				isCurrent: true,
				achievements: [
					'Design architectural solutions in collaboration with software, cloud, and data team leads to enable system interoperability across diverse environments',
					'Lead architectural design efforts for complex challenges including dynamic resource provisioning with container orchestration',
					'Translate complex technical requirements into actionable architectural plans while collaborating with subject matter experts',
					'Architect solutions supporting CI/CD integration, cross-platform testing, and hybrid deployment scenarios'
				],
				technologies: ['Azure', 'Python', 'TypeScript', 'Kubernetes', 'Docker', 'CI/CD']
			},
			{
				title: 'Senior Software Engineer',
				company: 'Occam Solutions',
				location: 'Fayetteville, NC',
				startDate: '2022-06',
				endDate: '2024-10',
				isCurrent: false,
				achievements: [
					'Led technical architecture and development for cloud-hosted data platform enabling third-party vendors to ingest and process large datasets via Azure blob storage',
					'Spearheaded software engineering, system architecture, and DevOps initiatives while serving as primary client interface',
					'Processed datasets through NLP and ML enrichment pipelines, storing results across MongoDB, PostgreSQL, and Azure blob storage',
					'Modernized team development practices by implementing GitLab source code management and CI/CD pipelines',
					'Created comprehensive documentation and coding standards while mentoring junior developers',
					'Built NextJS frontend with React and TypeScript, and managed containerized deployments using Docker and Kubernetes'
				],
				technologies: [
					'Azure',
					'Python',
					'FastAPI',
					'NextJS',
					'React',
					'TypeScript',
					'MongoDB',
					'PostgreSQL',
					'Docker',
					'Kubernetes',
					'GitLab CI/CD',
					'Apache Nifi'
				]
			},
			{
				title: 'Software Engineer - Revenue Operations',
				company: 'Carrus Learn',
				location: 'Remote',
				startDate: '2022-03',
				endDate: '2022-06',
				isCurrent: false,
				achievements: [
					'Maintained, tested, and updated a suite of Node.js and Angular applications integrated with MySQL and MongoDB databases',
					'Successfully integrated JavaScript applications with SalesForce, BigCommerce, Canvas, and other third-party systems',
					'Resolved bugs and issues by refactoring existing code and writing new modules to increase interoperability of microservices'
				],
				technologies: [
					'Node.js',
					'Angular',
					'MySQL',
					'MongoDB',
					'Express',
					'Hapi',
					'PHP',
					'SalesForce',
					'BigCommerce'
				]
			},
			{
				title: 'Full-Stack Web Application Developer',
				company: 'Clayton InterGalactic',
				location: 'Remote',
				startDate: '2021-08',
				endDate: '2022-07',
				isCurrent: false,
				achievements: [
					'Developed and deployed Javascript applications for a newly launched platform leveraging blockchain identities for authentication',
					'Created a modified frontend fork of the Jitsi Meet video conferencing application to maximize user privacy',
					'Added modular design elements to enable customized branding for Clayton Intergalactic Partner-program organizations'
				],
				technologies: ['JavaScript', 'Blockchain', 'Jitsi Meet', 'Azure DevOps']
			},
			{
				title: 'Full-Stack Software Engineer',
				company: 'Sigma Technologies',
				location: 'Remote',
				startDate: '2021-08',
				endDate: '2025-07',
				isCurrent: false,
				achievements: [
					'Architected and developed comprehensive business management platform from concept to production as sole technical lead',
					'Built scalable backend infrastructure using Node.js, Express.js, TypeScript, and MongoDB with RESTful API and real-time WebSocket capabilities',
					'Designed complex business operations support including task management, staff communication, and automated workflows',
					'Engineered real-time features including live chat, user presence tracking, and priority notification system',
					'Integrated AI capabilities through Claude and OpenAI APIs, implementing context-aware chatbots',
					'Deployed production infrastructure on AWS using containerized architecture with ECS, ECR, and S3'
				],
				technologies: [
					'Node.js',
					'Express.js',
					'TypeScript',
					'MongoDB',
					'WebSocket',
					'JWT',
					'OAuth',
					'AWS',
					'ECS',
					'ECR',
					'S3',
					'Claude API',
					'OpenAI API'
				]
			},
			{
				title: 'Signals Intelligence Analyst',
				company: 'U.S. Army',
				location: 'Asia-Pacific Region',
				startDate: '2010-07',
				endDate: '2016-07',
				isCurrent: false,
				achievements: [
					'Performed advanced technical data collection, network analysis, and processing supporting SOF and interagency missions',
					'Conducted extensive IP over wireless and ethernet network analysis using Wireshark and specialized tools',
					'Developed automated data management programs for unclassified data retrieval, parsing, and storage improving operational efficiency by 40%',
					"Created comprehensive SOPs and technical documentation for unit's data collection efforts",
					'Analyzed complex network communications and data flows, producing actionable intelligence reports'
				],
				technologies: [
					'Network Analysis',
					'Wireshark',
					'Python',
					'Data Processing',
					'Linux',
					'Intelligence Systems'
				]
			}
		]
	},
	projects: {
		heading: 'Featured Projects',
		projects: [
			{
				name: 'Sigma Adviser Platform',
				description:
					'Enterprise advisor-client interaction platform with real-time activity tracking',
				longDescription:
					'A comprehensive enterprise solution consisting of a Node.js/Express backend with MongoDB and a Next.js frontend. Features real-time activity tracking with three-tier status system, advanced authentication with Google OAuth, universal keyboard shortcuts, and comprehensive testing infrastructure. Demonstrates full-stack enterprise development with AWS deployment.',
				technologies: [
					'Next.js',
					'Node.js',
					'Express',
					'MongoDB',
					'TypeScript',
					'Redux Toolkit',
					'Socket.IO',
					'AWS',
					'Docker',
					'Jest',
					'Playwright'
				],
				features: [
					'Real-time activity tracking',
					'Role-based authentication',
					'Universal keyboard shortcuts',
					'SMS/Email notifications',
					'AWS integration',
					'Comprehensive testing',
					'Professional UI/UX'
				],
				status: 'Live',
				startDate: '2023-01-01',
				endDate: 'Ongoing',
				images: [],
				githubUrl: '', // Private enterprise repository
				demoUrl: '' // Enterprise application
			},
			{
				name: 'Image Mapper Service',
				description:
					'Comprehensive image matching and comparison service with multiple detection methods',
				longDescription:
					'A Flask-based REST API service for image analysis and matching using multiple algorithms including color grid analysis, perceptual hashing, and feature matching. Features an interactive web interface, Docker deployment, and optimized performance with caching and binary protocols.',
				technologies: ['Python', 'Flask', 'OpenCV', 'Pillow', 'NumPy', 'Docker', 'pytest'],
				features: [
					'Multiple matching algorithms',
					'REST API',
					'Interactive web interface',
					'Performance optimization',
					'Docker support',
					'Comprehensive testing'
				],
				status: 'Live',
				startDate: '2023-09-01',
				endDate: '2024-01-01',
				images: [],
				githubUrl: '',
				demoUrl: ''
			},
			{
				name: 'SvelteKit Portfolio',
				description: 'Modern personal portfolio website with cutting-edge web technologies',
				longDescription:
					'A contemporary portfolio website built with SvelteKit and TypeScript, featuring Tailwind CSS v4, comprehensive testing with Vitest and Playwright, Storybook documentation, and accessibility-first design. Optimized for Core Web Vitals and static site generation.',
				technologies: [
					'SvelteKit',
					'TypeScript',
					'Tailwind CSS',
					'Vitest',
					'Playwright',
					'Storybook',
					'MDSvex'
				],
				features: [
					'Static site generation',
					'Component documentation',
					'Comprehensive testing',
					'Accessibility compliance',
					'Performance optimization',
					'Modern development workflow'
				],
				status: 'In Development',
				startDate: '2024-09-01',
				endDate: 'Ongoing',
				images: [],
				githubUrl: '',
				demoUrl: ''
			},
			{
				name: 'Valuation Frontend',
				description: 'Financial valuation workflows application with data visualization',
				longDescription:
					'A Next.js application for financial valuation processes featuring interactive charts with Recharts, geographic mapping with React Leaflet, PDF generation, and modern form handling with React Hook Form and Zod validation.',
				technologies: [
					'Next.js',
					'React',
					'TypeScript',
					'Redux Toolkit',
					'Recharts',
					'React Leaflet',
					'Tailwind CSS'
				],
				features: [
					'Financial data visualization',
					'Interactive charts',
					'Geographic mapping',
					'PDF generation',
					'Form validation',
					'Modern UI/UX'
				],
				status: 'In Development',
				startDate: '2024-01-01',
				endDate: 'Ongoing',
				images: [],
				githubUrl: '',
				demoUrl: ''
			},
			{
				name: 'HTTP Test Server',
				description:
					'Enhanced HTTP testing server with payload validation and request orchestration',
				longDescription:
					'A security-focused Flask-based HTTP testing server featuring HTML payload validation, XSS protection, dynamic endpoint creation, and request orchestration for external API testing. Includes Kubernetes-ready health probes and comprehensive security measures.',
				technologies: ['Python', 'Flask', 'pytest', 'Docker', 'Kubernetes'],
				features: [
					'HTML validation',
					'Security protection',
					'Dynamic endpoints',
					'Request orchestration',
					'Health monitoring',
					'Enterprise-grade testing'
				],
				status: 'Live',
				startDate: '2023-08-01',
				endDate: '2024-01-01',
				images: [],
				githubUrl: '', // Private repository
				demoUrl: ''
			},
			{
				name: 'React Native Mobile App',
				description: 'Cross-platform mobile application demonstrating React Native expertise',
				longDescription:
					'A clean React Native project setup showcasing modern mobile development capabilities with TypeScript integration, comprehensive testing with Jest, and cross-platform deployment for iOS and Android.',
				technologies: ['React Native', 'TypeScript', 'Jest', 'Babel', 'ESLint'],
				features: [
					'Cross-platform development',
					'TypeScript integration',
					'Modern toolchain',
					'Comprehensive testing',
					'iOS/Android support'
				],
				status: 'Concept',
				startDate: '2024-06-01',
				endDate: '2024-07-01',
				images: [],
				githubUrl: '',
				demoUrl: ''
			}
		]
	},
	reading: {
		heading: 'Inspiration & Recommended Reading',
		subtitle: 'Books that have shaped my approach to software architecture and development',
		books: [
			{
				title: 'Designing Data-Intensive Applications',
				author: 'Martin Kleppmann',
				category: 'System Design',
				description:
					'The definitive guide to building reliable, scalable, and maintainable systems that handle massive amounts of data.',
				rating: 5,
				coverImage:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415816873i/23463279.jpg'
			},
			{
				title: 'Software Architecture: The Hard Parts',
				author: 'Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani',
				category: 'Architecture',
				description: 'Modern approaches to software architecture and distributed systems design.',
				rating: 5,
				coverImage:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1633963465i/58153482.jpg'
			},
			{
				title: 'Building Microservices',
				author: 'Sam Newman',
				category: 'Architecture',
				description:
					'Comprehensive guide to designing, developing, and deploying microservices architectures.',
				rating: 4,
				coverImage:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403186979i/22512931.jpg'
			},
			{
				title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
				author: 'Gang of Four',
				category: 'Software Design',
				description:
					'The classic reference for object-oriented design patterns that every developer should know.',
				rating: 4,
				coverImage:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348027904i/85009.jpg'
			},
			{
				title: 'AI and Machine Learning for Coders',
				author: 'Laurence Moroney',
				category: 'AI/ML',
				description:
					'Practical introduction to building AI and machine learning applications for developers.',
				rating: 4,
				coverImage:
					'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583340796i/50204636.jpg'
			},
			{
				title: 'AI Agents in Action',
				author: 'Micheal Lanham',
				category: 'AI/ML',
				description: 'Real-world applications and implementations of autonomous AI agents.',
				rating: 4,
				coverImage: 'https://www.oreilly.com/covers/urn:orm:book:9781633436343/400w/'
			},
			{
				title: 'UX Strategy',
				author: 'Jane Levy',
				category: 'Design',
				description: 'Modern principles and practices for creating exceptional user experiences.',
				rating: 4,
				coverImage: 'https://jaimelevy.com/wp-content/uploads/2025/01/2ndEdition-BookCover.jpg'
			}
		]
	},
	contact: {
		heading: 'Get In Touch',
		socialLinks: [
			{
				platform: 'LinkedIn',
				url: 'https://linkedin.com/in/marcusradder',
				handle: 'marcusradder',
				iconPath: '/icons/linkedin.svg'
			},
			{
				platform: 'GitHub',
				url: 'https://github.com/maradder',
				handle: 'maradder',
				iconPath: '/icons/github.svg'
			}
		]
	},
	navigation: {
		brand: 'Marcus Radder',
		mobileBreakpoint: 768,
		menuItems: [
			{ label: 'Home', anchor: '#hero', order: 1, isActive: true },
			{ label: 'About', anchor: '#about', order: 2, isActive: false },
			{ label: 'Skills', anchor: '#skills', order: 3, isActive: false },
			{ label: 'Experience', anchor: '#experience', order: 4, isActive: false },
			{ label: 'Projects', anchor: '#projects', order: 5, isActive: false },
			{ label: 'Reading', anchor: '#reading', order: 6, isActive: false },
			{ label: 'Contact', anchor: '#contact', order: 7, isActive: false }
		]
	}
});

// Derived store that updates hero data based on current position
export const portfolioDataWithCurrentJob = derived(portfolioData, ($data) => {
	const currentPosition = $data.experience.positions.find((position) => position.isCurrent);

	if (currentPosition) {
		return {
			...$data,
			hero: {
				...$data.hero,
				title: `${currentPosition.title} with Leadership Experience`,
				subtitle: currentPosition.title
			}
		};
	}

	return $data;
});

// Navigation helper functions
export function setActiveSection(section: string) {
	activeSection.set(section);

	portfolioData.update((data) => {
		data.navigation.menuItems = data.navigation.menuItems.map((item) => ({
			...item,
			isActive: item.anchor === `#${section}`
		}));
		return data;
	});
}
