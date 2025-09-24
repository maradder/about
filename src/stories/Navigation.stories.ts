import type { Meta, StoryObj } from '@storybook/svelte';
import type { NavigationProps } from '$lib/types/portfolio';
import Navigation from '$lib/components/navigation/Navigation.svelte';

const meta = {
	title: 'Components/Navigation',
	component: Navigation,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Site-wide navigation enabling movement between sections with responsive mobile menu'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		brand: {
			control: 'text',
			description: 'Brand text or logo text'
		},
		logoPath: {
			control: 'text',
			description: 'Path to logo image (optional)'
		},
		menuItems: {
			control: 'object',
			description: 'Array of navigation menu items'
		},
		mobileBreakpoint: {
			control: 'number',
			description: 'Screen width for mobile menu toggle'
		}
	}
} satisfies Meta<NavigationProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		brand: 'Marcus Radder',
		mobileBreakpoint: 768,
		menuItems: [
			{ label: 'Home', anchor: '#hero', order: 1, isActive: true },
			{ label: 'About', anchor: '#about', order: 2, isActive: false },
			{ label: 'Skills', anchor: '#skills', order: 3, isActive: false },
			{ label: 'Experience', anchor: '#experience', order: 4, isActive: false },
			{ label: 'Projects', anchor: '#projects', order: 5, isActive: false },
			{ label: 'Contact', anchor: '#contact', order: 6, isActive: false }
		]
	}
};

export const WithLogo: Story = {
	args: {
		...Default.args,
		brand: 'MR',
		logoPath: '/images/logo.svg'
	}
};

export const AboutActive: Story = {
	args: {
		...Default.args,
		menuItems: [
			{ label: 'Home', anchor: '#hero', order: 1, isActive: false },
			{ label: 'About', anchor: '#about', order: 2, isActive: true },
			{ label: 'Skills', anchor: '#skills', order: 3, isActive: false },
			{ label: 'Experience', anchor: '#experience', order: 4, isActive: false },
			{ label: 'Projects', anchor: '#projects', order: 5, isActive: false },
			{ label: 'Contact', anchor: '#contact', order: 6, isActive: false }
		]
	}
};

export const Minimal: Story = {
	args: {
		brand: 'Portfolio',
		mobileBreakpoint: 768,
		menuItems: [
			{ label: 'About', anchor: '#about', order: 1, isActive: false },
			{ label: 'Work', anchor: '#projects', order: 2, isActive: true },
			{ label: 'Contact', anchor: '#contact', order: 3, isActive: false }
		]
	}
};

export const LongBrandName: Story = {
	args: {
		brand: 'Marcus Radder - Systems Architect',
		mobileBreakpoint: 768,
		menuItems: [
			{ label: 'Home', anchor: '#hero', order: 1, isActive: true },
			{ label: 'About', anchor: '#about', order: 2, isActive: false },
			{ label: 'Skills', anchor: '#skills', order: 3, isActive: false },
			{ label: 'Experience', anchor: '#experience', order: 4, isActive: false },
			{ label: 'Projects', anchor: '#projects', order: 5, isActive: false },
			{ label: 'Contact', anchor: '#contact', order: 6, isActive: false }
		]
	}
};

export const MobileBreakpoint: Story = {
	args: {
		...Default.args,
		mobileBreakpoint: 1024
	},
	parameters: {
		viewport: {
			defaultViewport: 'tablet'
		}
	}
};
