import type { Meta, StoryObj } from '@storybook/svelte';
import type { ContactSectionProps } from '$lib/types/portfolio';
import ContactSection from '$lib/components/sections/ContactSection.svelte';

const meta = {
	title: 'Sections/ContactSection',
	component: ContactSection,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Professional contact information and social media links'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			control: 'text',
			description: 'Section heading'
		},
		email: {
			control: 'text',
			description: 'Primary email address'
		},
		phone: {
			control: 'text',
			description: 'Phone number (optional)'
		},
		socialLinks: {
			control: 'object',
			description: 'Array of social media and professional links'
		},
		contactMessage: {
			control: 'text',
			description: 'Brief message encouraging contact'
		}
	}
} satisfies Meta<ContactSectionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		heading: 'Get In Touch',
		email: 'marcusradder@gmail.com',
		phone: '(360) 746-1255',
		contactMessage:
			"I'm always interested in discussing new opportunities, collaborating on interesting projects, or just connecting with fellow technologists.",
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
			},
			{
				platform: 'Twitter',
				url: 'https://twitter.com/marcusradder',
				handle: '@marcusradder',
				iconPath: '/icons/twitter.svg'
			},
			{
				platform: 'Website',
				url: 'https://marcusradder.dev',
				handle: 'marcusradder.dev',
				iconPath: '/icons/website.svg'
			}
		]
	}
};

export const Minimal: Story = {
	args: {
		heading: 'Contact',
		email: 'marcusradder@gmail.com',
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
	}
};

export const WithoutPhone: Story = {
	args: {
		...Default.args,
		phone: undefined
	}
};

export const BusinessFocused: Story = {
	args: {
		heading: "Let's Connect",
		email: 'marcus@occamsolutions.com',
		contactMessage:
			"Interested in discussing system architecture, cloud solutions, or potential collaboration opportunities? I'd love to hear from you.",
		socialLinks: [
			{
				platform: 'LinkedIn',
				url: 'https://linkedin.com/in/marcusradder',
				handle: 'LinkedIn Profile',
				iconPath: '/icons/linkedin.svg'
			},
			{
				platform: 'GitHub',
				url: 'https://github.com/maradder',
				handle: 'GitHub Portfolio',
				iconPath: '/icons/github.svg'
			},
			{
				platform: 'Website',
				url: 'https://marcusradder.dev',
				handle: 'Portfolio Website',
				iconPath: '/icons/website.svg'
			}
		]
	}
};

export const ExtensiveSocial: Story = {
	args: {
		...Default.args,
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
			},
			{
				platform: 'Twitter',
				url: 'https://twitter.com/marcusradder',
				handle: '@marcusradder',
				iconPath: '/icons/twitter.svg'
			},
			{
				platform: 'Website',
				url: 'https://marcusradder.dev',
				handle: 'marcusradder.dev',
				iconPath: '/icons/website.svg'
			},
			{
				platform: 'Other',
				url: 'https://medium.com/@marcusradder',
				handle: 'Medium Blog',
				iconPath: '/icons/medium.svg'
			},
			{
				platform: 'Other',
				url: 'https://dev.to/marcusradder',
				handle: 'DEV Community',
				iconPath: '/icons/dev.svg'
			}
		]
	}
};
