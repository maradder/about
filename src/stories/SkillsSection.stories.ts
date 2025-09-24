import type { Meta, StoryObj } from '@storybook/svelte';
import type { SkillsSectionProps } from '$lib/types/portfolio';
import SkillsSection from '$lib/components/sections/SkillsSection.svelte';

const meta = {
	title: 'Sections/SkillsSection',
	component: SkillsSection,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Technical competencies organized by category for easy scanning'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			control: 'text',
			description: 'Section heading'
		},
		categories: {
			control: 'object',
			description: 'Array of skill categories with skills'
		}
	}
} satisfies Meta<SkillsSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: 'Technical Skills',
		categories: [
			{
				name: 'Programming Languages',
				displayOrder: 1,
				skills: [
					{
						name: 'Python',
						proficiency: 'Expert',
						yearsExperience: 6,
						iconPath: '/icons/python.svg'
					},
					{
						name: 'TypeScript',
						proficiency: 'Expert',
						yearsExperience: 5,
						iconPath: '/icons/typescript.svg'
					},
					{
						name: 'JavaScript',
						proficiency: 'Advanced',
						yearsExperience: 7,
						iconPath: '/icons/javascript.svg'
					},
					{ name: 'SQL', proficiency: 'Advanced', yearsExperience: 8 }
				]
			},
			{
				name: 'Cloud Platforms',
				displayOrder: 2,
				skills: [
					{
						name: 'Azure',
						proficiency: 'Expert',
						yearsExperience: 4,
						iconPath: '/icons/azure.svg'
					},
					{ name: 'AWS', proficiency: 'Advanced', yearsExperience: 3, iconPath: '/icons/aws.svg' },
					{ name: 'Google Cloud', proficiency: 'Intermediate', yearsExperience: 2 }
				]
			},
			{
				name: 'DevOps & Tools',
				displayOrder: 3,
				skills: [
					{
						name: 'Docker',
						proficiency: 'Expert',
						yearsExperience: 5,
						iconPath: '/icons/docker.svg'
					},
					{ name: 'GitLab CI/CD', proficiency: 'Advanced', yearsExperience: 4 },
					{ name: 'Terraform', proficiency: 'Advanced', yearsExperience: 3 },
					{ name: 'Kubernetes', proficiency: 'Intermediate', yearsExperience: 2 }
				]
			},
			{
				name: 'Databases',
				displayOrder: 4,
				skills: [
					{
						name: 'PostgreSQL',
						proficiency: 'Expert',
						yearsExperience: 6,
						iconPath: '/icons/postgresql.svg'
					},
					{
						name: 'MongoDB',
						proficiency: 'Advanced',
						yearsExperience: 4,
						iconPath: '/icons/mongodb.svg'
					},
					{ name: 'Redis', proficiency: 'Advanced', yearsExperience: 3 }
				]
			},
			{
				name: 'Frontend Technologies',
				displayOrder: 5,
				skills: [
					{
						name: 'Svelte',
						proficiency: 'Advanced',
						yearsExperience: 2,
						iconPath: '/icons/svelte.svg'
					},
					{
						name: 'React',
						proficiency: 'Advanced',
						yearsExperience: 4,
						iconPath: '/icons/react.svg'
					},
					{
						name: 'Tailwind CSS',
						proficiency: 'Expert',
						yearsExperience: 3,
						iconPath: '/icons/tailwind.svg'
					}
				]
			},
			{
				name: 'Design Tools',
				displayOrder: 6,
				skills: [
					{
						name: 'Figma',
						proficiency: 'Advanced',
						yearsExperience: 3,
						iconPath: '/icons/figma.svg'
					},
					{ name: 'Adobe Creative Suite', proficiency: 'Intermediate', yearsExperience: 4 }
				]
			}
		]
	}
};

export const Minimal: Story = {
	args: {
		heading: 'Skills',
		categories: [
			{
				name: 'Core Technologies',
				displayOrder: 1,
				skills: [
					{ name: 'Python', proficiency: 'Expert' },
					{ name: 'TypeScript', proficiency: 'Expert' },
					{ name: 'Azure', proficiency: 'Expert' },
					{ name: 'Docker', proficiency: 'Advanced' }
				]
			}
		]
	}
};

export const WithoutIcons: Story = {
	args: {
		heading: 'Technical Expertise',
		categories: [
			{
				name: 'Backend',
				displayOrder: 1,
				skills: [
					{ name: 'Python', proficiency: 'Expert', yearsExperience: 6 },
					{ name: 'Node.js', proficiency: 'Advanced', yearsExperience: 4 },
					{ name: 'FastAPI', proficiency: 'Expert', yearsExperience: 3 }
				]
			},
			{
				name: 'Frontend',
				displayOrder: 2,
				skills: [
					{ name: 'TypeScript', proficiency: 'Expert', yearsExperience: 5 },
					{ name: 'Svelte', proficiency: 'Advanced', yearsExperience: 2 },
					{ name: 'Tailwind CSS', proficiency: 'Expert', yearsExperience: 3 }
				]
			}
		]
	}
};
