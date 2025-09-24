import type { Meta, StoryObj } from '@storybook/svelte';
import type { ExperienceSectionProps } from '$lib/types/portfolio';
import ExperienceSection from '$lib/components/sections/ExperienceSection.svelte';

const meta = {
	title: 'Sections/ExperienceSection',
	component: ExperienceSection,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Chronological work history with roles, dates, and key achievements'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			control: 'text',
			description: 'Section heading'
		},
		positions: {
			control: 'object',
			description: 'Array of professional positions'
		}
	}
} satisfies Meta<ExperienceSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: 'Professional Experience',
		positions: [
			{
				title: 'Systems Architect',
				company: 'Occam Solutions',
				companyUrl: 'https://occamsolutions.com',
				location: 'Remote',
				startDate: '2024-11',
				endDate: 'Present',
				isCurrent: true,
				achievements: [
					'Leading architecture design for next-generation cloud platform',
					'Establishing technical standards and best practices across engineering teams',
					'Driving migration strategy from monolithic to microservices architecture',
					'Mentoring senior engineers and facilitating knowledge sharing sessions'
				],
				technologies: ['Azure', 'Python', 'TypeScript', 'Kubernetes', 'Terraform', 'PostgreSQL']
			},
			{
				title: 'Senior Software Engineer',
				company: 'TechCorp',
				companyUrl: 'https://techcorp.example.com',
				location: 'Seattle, WA',
				startDate: '2022-03',
				endDate: '2024-10',
				isCurrent: false,
				achievements: [
					'Designed and implemented cloud-hosted data platform serving 50k+ daily users',
					'Reduced system latency by 60% through optimization and caching strategies',
					'Led cross-functional team of 8 engineers across frontend, backend, and DevOps',
					'Established CI/CD pipelines reducing deployment time from hours to minutes'
				],
				technologies: ['AWS', 'Python', 'React', 'Docker', 'GitLab CI/CD', 'MongoDB']
			},
			{
				title: 'Software Engineer',
				company: 'StartupXYZ',
				location: 'San Francisco, CA',
				startDate: '2020-06',
				endDate: '2022-02',
				isCurrent: false,
				achievements: [
					'Built business management platform from ground up using modern tech stack',
					'Implemented real-time collaboration features using WebSockets',
					'Developed RESTful APIs handling 10k+ requests per minute',
					'Created automated testing suite achieving 95% code coverage'
				],
				technologies: ['Node.js', 'TypeScript', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker']
			},
			{
				title: 'Signals Intelligence Analyst',
				company: 'US Army',
				location: 'Fort Gordon, GA',
				startDate: '2017-01',
				endDate: '2020-05',
				isCurrent: false,
				achievements: [
					'Analyzed complex data patterns to identify security threats and opportunities',
					'Developed automated reporting tools reducing analysis time by 40%',
					'Led team of 5 analysts in high-priority intelligence operations',
					'Received commendation for innovation in data processing methodologies'
				],
				technologies: ['Python', 'SQL', 'Data Analysis', 'Linux', 'Bash Scripting']
			}
		]
	}
};

export const CurrentPositionOnly: Story = {
	args: {
		heading: 'Current Role',
		positions: [
			{
				title: 'Systems Architect',
				company: 'Occam Solutions',
				companyUrl: 'https://occamsolutions.com',
				location: 'Remote',
				startDate: '2024-11',
				endDate: 'Present',
				isCurrent: true,
				achievements: [
					'Leading architecture design for next-generation cloud platform',
					'Establishing technical standards and best practices',
					'Driving microservices migration strategy'
				],
				technologies: ['Azure', 'Python', 'TypeScript', 'Kubernetes']
			}
		]
	}
};

export const WithoutCompanyUrls: Story = {
	args: {
		heading: 'Experience',
		positions: [
			{
				title: 'Senior Software Engineer',
				company: 'TechCorp',
				location: 'Seattle, WA',
				startDate: '2022-03',
				endDate: '2024-10',
				isCurrent: false,
				achievements: [
					'Designed cloud-hosted data platform',
					'Reduced system latency by 60%',
					'Led team of 8 engineers'
				],
				technologies: ['AWS', 'Python', 'React', 'Docker']
			},
			{
				title: 'Software Engineer',
				company: 'StartupXYZ',
				location: 'San Francisco, CA',
				startDate: '2020-06',
				endDate: '2022-02',
				isCurrent: false,
				achievements: [
					'Built business management platform',
					'Implemented real-time features',
					'Created automated testing suite'
				],
				technologies: ['Node.js', 'TypeScript', 'Vue.js', 'PostgreSQL']
			}
		]
	}
};
