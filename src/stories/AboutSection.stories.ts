import type { Meta, StoryObj } from '@storybook/svelte';
import type { AboutSectionProps } from '$lib/types/portfolio';
import AboutSection from '$lib/components/sections/AboutSection.svelte';

const meta = {
	title: 'Sections/AboutSection',
	component: AboutSection,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Professional narrative highlighting career progression and expertise'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			control: 'text',
			description: 'Section heading'
		},
		narrative: {
			control: 'text',
			description: 'Main professional story in markdown format'
		},
		highlights: {
			control: 'object',
			description: 'Key career achievements or transitions'
		},
		personalTouch: {
			control: 'text',
			description: 'Optional personal element to humanize professional image'
		},
		resumeLink: {
			control: 'text',
			description: 'Link to downloadable resume/CV'
		}
	}
} satisfies Meta<AboutSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: 'About Me',
		narrative: `I'm a Systems Architect with extensive experience in building scalable cloud solutions.

My journey began in **Signals Intelligence Analysis**, where I developed a keen eye for pattern recognition and data analysis. This foundation proved invaluable as I transitioned into software engineering, bringing analytical rigor to every technical challenge.

Over the years, I've progressed through senior engineering roles, consistently focusing on **system architecture** and **technical leadership**. I specialize in cloud platforms (Azure/AWS), full-stack development, and DevOps practices.

What drives me is the opportunity to solve complex problems and mentor growing teams while delivering solutions that truly make a difference.`,
		highlights: [
			'Transitioned from Intelligence Analysis to Systems Architecture',
			'Led multiple cloud migration projects with zero downtime',
			'Architected systems serving mission critical applications',
			'Mentored 15+ engineers across various technology stacks'
		],
		personalTouch:
			'When not coding, I enjoy exploring the Pacific Northwest with my family and contributing to open-source projects.',
		resumeLink: '/files/marcus-radder-resume.pdf'
	}
};

export const Minimal: Story = {
	args: {
		heading: 'About',
		narrative: `Systems Architect with a background in intelligence analysis and a passion for building scalable solutions.

I bring analytical rigor and technical leadership to every project, specializing in cloud-native architectures and team development.`,
		highlights: [
			'Intelligence Analysis to Software Engineering transition',
			'Cloud architecture and DevOps expertise',
			'Technical leadership and mentoring'
		]
	}
};

export const WithoutPersonalTouch: Story = {
	args: {
		...Default.args,
		personalTouch: undefined
	}
};

export const ExtensiveHighlights: Story = {
	args: {
		...Default.args,
		highlights: [
			'Transitioned from Intelligence Analysis to Systems Architecture',
			'Led multiple cloud migration projects with zero downtime',
			'Architected systems serving mission critical applications',
			'Mentored 15+ engineers across various technology stacks',
			'Reduced infrastructure costs by 40% through optimization'
		]
	}
};
