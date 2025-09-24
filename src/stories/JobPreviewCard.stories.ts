import type { Meta, StoryObj } from '@storybook/svelte';
import JobPreviewCard from '$lib/components/ui/JobPreviewCard.svelte';

const meta = {
	title: 'UI/JobPreviewCard',
	component: JobPreviewCard,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A hover preview card that shows job details including technologies and synopsis.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		position: {
			description: 'Position data object containing job details',
			control: { type: 'object' }
		},
		x: {
			description: 'X coordinate for positioning the card',
			control: { type: 'number' }
		},
		y: {
			description: 'Y coordinate for positioning the card',
			control: { type: 'number' }
		},
		visible: {
			description: 'Whether the card is visible',
			control: { type: 'boolean' }
		}
	}
} satisfies Meta<JobPreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPosition = {
	title: 'Systems Architect',
	company: 'Occam Solutions',
	location: 'Remote',
	startDate: '2024-11',
	endDate: 'Present',
	isCurrent: true,
	achievements: [
		'Design architectural solutions in collaboration with software, cloud, and data team leads to enable system interoperability across diverse environments',
		'Lead architectural design efforts for complex challenges including dynamic resource provisioning with container orchestration',
		'Translate complex technical requirements into actionable architectural plans while collaborating with subject matter experts'
	],
	technologies: [
		'Azure',
		'Python',
		'TypeScript',
		'Kubernetes',
		'Docker',
		'CI/CD',
		'Microservices',
		'API Design'
	]
};

export const Default: Story = {
	args: {
		position: mockPosition,
		x: 400,
		y: 200,
		visible: true
	}
};

export const LongTechnologiesList: Story = {
	args: {
		position: {
			...mockPosition,
			technologies: [
				'Azure',
				'Python',
				'TypeScript',
				'Kubernetes',
				'Docker',
				'CI/CD',
				'NextJS',
				'React',
				'MongoDB',
				'PostgreSQL',
				'GitLab CI/CD',
				'Apache Nifi',
				'FastAPI',
				'Microservices'
			]
		},
		x: 400,
		y: 200,
		visible: true
	}
};

export const ShortSynopsis: Story = {
	args: {
		position: {
			...mockPosition,
			achievements: ['Built scalable systems']
		},
		x: 400,
		y: 200,
		visible: true
	}
};

export const Hidden: Story = {
	args: {
		position: mockPosition,
		x: 400,
		y: 200,
		visible: false
	}
};
