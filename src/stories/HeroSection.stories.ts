import type { Meta, StoryObj } from '@storybook/svelte';
import type { HeroSectionProps } from '$lib/types/portfolio';
import HeroSection from '$lib/components/sections/HeroSection.svelte';

const meta = {
	title: 'Sections/HeroSection',
	component: HeroSection,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Primary landing section that immediately communicates identity and value proposition'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'text',
			description: 'Full professional name'
		},
		title: {
			control: 'text',
			description: 'Primary professional title'
		},
		subtitle: {
			control: 'text',
			description: 'Specialized focus or role'
		},
		tagline: {
			control: 'text',
			description: 'Brief value proposition or professional summary'
		},
		ctaText: {
			control: 'text',
			description: 'Call-to-action button text'
		},
		ctaLink: {
			control: 'text',
			description: 'Call-to-action destination (anchor or external)'
		},
		backgroundImage: {
			control: 'text',
			description: 'Optional hero background image path'
		},
		profileImage: {
			control: 'text',
			description: 'Professional headshot image path'
		}
	}
} satisfies Meta<HeroSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'Marcus Radder',
		title: 'Software Engineer with Leadership Experience',
		subtitle: 'Systems Architect',
		tagline: 'Building scalable solutions with cloud-native technologies',
		ctaText: 'View My Work',
		ctaLink: '#projects',
		profileImage: '/images/profile.jpg'
	}
};

export const WithBackground: Story = {
	args: {
		...Default.args,
		backgroundImage: '/images/hero-bg.jpg'
	}
};

export const Minimal: Story = {
	args: {
		name: 'Marcus Radder',
		title: 'Software Engineer with Leadership Experience',
		subtitle: 'Systems Architect',
		ctaText: 'Get In Touch',
		ctaLink: '#contact'
	}
};

export const WithCustomTagline: Story = {
	args: {
		...Default.args,
		tagline: 'Transforming complex business requirements into elegant technical solutions'
	}
};
