import type { Meta, StoryObj } from '@storybook/svelte';
import type { ProjectsSectionProps } from '$lib/types/portfolio';
import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';

const meta = {
	title: 'Sections/ProjectsSection',
	component: ProjectsSection,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Featured work examples demonstrating technical capabilities'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			control: 'text',
			description: 'Section heading'
		},
		projects: {
			control: 'object',
			description: 'Array of featured projects'
		}
	}
} satisfies Meta<ProjectsSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: 'Featured Projects',
		projects: [
			{
				name: 'Cloud Data Platform',
				description: 'Scalable data processing platform with ML pipelines and real-time analytics',
				longDescription: `A comprehensive cloud-hosted data platform built to handle massive data ingestion, processing, and analysis workflows.

The platform features automated ML pipelines for natural language processing, real-time data streaming capabilities, and a responsive dashboard for data visualization.

Key technical challenges solved include optimizing for high-throughput data processing, implementing fault-tolerant distributed systems, and creating intuitive user interfaces for complex data operations.`,
				technologies: [
					'Azure',
					'Python',
					'FastAPI',
					'PostgreSQL',
					'Docker',
					'Kubernetes',
					'Redis',
					'Scikit-learn'
				],
				features: [
					'Real-time data streaming and processing',
					'Automated ML pipeline orchestration',
					'Interactive data visualization dashboard',
					'RESTful API with comprehensive documentation',
					'Horizontal scaling with container orchestration',
					'Advanced caching and performance optimization'
				],
				demoUrl: 'https://dataplatform.demo.com',
				githubUrl: 'https://github.com/maradder/cloud-data-platform',
				images: ['/images/projects/data-platform-1.jpg', '/images/projects/data-platform-2.jpg'],
				status: 'Live',
				startDate: '2023-01',
				endDate: '2024-06'
			},
			{
				name: 'Business Management Platform',
				description:
					'Full-stack business management solution with real-time collaboration features',
				longDescription: `A complete business management platform designed for small to medium enterprises, featuring project management, team collaboration, and business analytics.

Built with modern web technologies, the platform emphasizes real-time collaboration, intuitive user experience, and comprehensive business intelligence.

The system handles complex business workflows, multi-tenant architecture, and real-time synchronization across distributed teams.`,
				technologies: [
					'Node.js',
					'TypeScript',
					'React',
					'MongoDB',
					'Socket.io',
					'Express',
					'JWT',
					'Material-UI'
				],
				features: [
					'Real-time team collaboration',
					'Project and task management',
					'Business analytics dashboard',
					'Multi-tenant architecture',
					'Role-based access control',
					'Mobile-responsive design'
				],
				demoUrl: 'https://bizplatform.demo.com',
				githubUrl: 'https://github.com/maradder/business-platform',
				images: [
					'/images/projects/biz-platform-1.jpg',
					'/images/projects/biz-platform-2.jpg',
					'/images/projects/biz-platform-3.jpg'
				],
				status: 'Live',
				startDate: '2022-03',
				endDate: '2023-08'
			},
			{
				name: 'Custom Video Conferencing Solution',
				description: 'Secure video conferencing platform with blockchain-based authentication',
				longDescription: `A custom video conferencing solution built on Jitsi Meet with enhanced security features and blockchain-based authentication.

The platform addresses privacy concerns in remote work environments by implementing end-to-end encryption, decentralized authentication, and custom security protocols.

This project demonstrates expertise in media streaming technologies, blockchain integration, and security-first application design.`,
				technologies: [
					'Jitsi Meet',
					'WebRTC',
					'Blockchain',
					'React',
					'Node.js',
					'WebSockets',
					'Docker',
					'NGINX'
				],
				features: [
					'End-to-end encrypted video calls',
					'Blockchain-based authentication',
					'Custom UI/UX design',
					'Screen sharing and recording',
					'Multi-platform support',
					'Advanced security protocols'
				],
				githubUrl: 'https://github.com/maradder/secure-video-platform',
				images: ['/images/projects/video-conf-1.jpg'],
				status: 'Archived',
				startDate: '2021-09',
				endDate: '2022-01'
			}
		]
	}
};

export const SingleProject: Story = {
	args: {
		heading: 'Latest Project',
		projects: [
			{
				name: 'Cloud Data Platform',
				description: 'Scalable data processing platform with ML pipelines and real-time analytics',
				longDescription: `A comprehensive cloud-hosted data platform built to handle massive data ingestion, processing, and analysis workflows.`,
				technologies: ['Azure', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
				features: [
					'Real-time data streaming',
					'ML pipeline orchestration',
					'Interactive dashboard',
					'RESTful API'
				],
				demoUrl: 'https://dataplatform.demo.com',
				githubUrl: 'https://github.com/maradder/cloud-data-platform',
				images: ['/images/projects/data-platform-1.jpg'],
				status: 'Live',
				startDate: '2023-01',
				endDate: '2024-06'
			}
		]
	}
};

export const ProjectsInDevelopment: Story = {
	args: {
		heading: 'Current Projects',
		projects: [
			{
				name: 'AI-Powered Analytics Dashboard',
				description: 'Next-generation analytics platform with AI-driven insights',
				longDescription: `Building an advanced analytics platform that leverages artificial intelligence to provide automated insights and predictive analytics for business decision-making.`,
				technologies: ['Python', 'TensorFlow', 'React', 'TypeScript', 'AWS'],
				features: [
					'AI-driven data insights',
					'Predictive analytics',
					'Custom dashboard builder',
					'Real-time alerts'
				],
				images: ['/images/projects/ai-dashboard-mockup.jpg'],
				status: 'In Development',
				startDate: '2024-09',
				endDate: 'Ongoing'
			},
			{
				name: 'Microservices E-commerce Platform',
				description: 'Scalable e-commerce solution built with microservices architecture',
				longDescription: `Developing a modern e-commerce platform using microservices architecture to demonstrate scalable system design and cloud-native development practices.`,
				technologies: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis', 'gRPC'],
				features: [
					'Microservices architecture',
					'Event-driven design',
					'Container orchestration',
					'API gateway implementation'
				],
				githubUrl: 'https://github.com/maradder/microservices-ecommerce',
				images: ['/images/projects/ecommerce-arch.jpg'],
				status: 'In Development',
				startDate: '2024-08',
				endDate: 'Ongoing'
			}
		]
	}
};
