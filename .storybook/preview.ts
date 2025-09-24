import type { Preview } from '@storybook/sveltekit';
import '../src/app.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#ffffff'
				},
				{
					name: 'dark',
					value: '#1e293b'
				},
				{
					name: 'portfolio',
					value: '#f8fafc'
				}
			]
		},
		docs: {
			toc: true
		},
		a11y: {
			config: {
				rules: [
					{
						id: 'color-contrast',
						enabled: true
					},
					{
						id: 'focus-order-semantics',
						enabled: true
					}
				]
			}
		}
	}
};

export default preview;
