import type { Meta, StoryObj } from '@storybook/svelte';
import ReadingSection from '$lib/components/sections/ReadingSection.svelte';

const meta = {
	title: 'Sections/ReadingSection',
	component: ReadingSection,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A section showcasing recommended books and reading inspiration, organized by category.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		heading: {
			description: 'Main heading for the reading section',
			control: { type: 'text' }
		},
		subtitle: {
			description: 'Optional subtitle providing context',
			control: { type: 'text' }
		},
		books: {
			description: 'Array of book objects to display',
			control: { type: 'object' }
		}
	}
} satisfies Meta<ReadingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBooks = [
	{
		title: 'Designing Data-Intensive Applications',
		author: 'Martin Kleppmann',
		category: 'System Design',
		description:
			'The definitive guide to building reliable, scalable, and maintainable systems that handle massive amounts of data.',
		rating: 5
	},
	{
		title: 'Software Architecture: The Hard Parts',
		author: 'Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani',
		category: 'Architecture',
		description: 'Modern approaches to software architecture and distributed systems design.',
		rating: 5
	},
	{
		title: 'Building Microservices',
		author: 'Sam Newman',
		category: 'Architecture',
		description:
			'Comprehensive guide to designing, developing, and deploying microservices architectures.',
		rating: 4
	},
	{
		title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
		author: 'Gang of Four',
		category: 'Software Design',
		description:
			'The classic reference for object-oriented design patterns that every developer should know.',
		rating: 4
	},
	{
		title: 'AI and Machine Learning for Coders',
		author: 'Laurence Moroney',
		category: 'AI/ML',
		description:
			'Practical introduction to building AI and machine learning applications for developers.',
		rating: 4
	},
	{
		title: 'UI/UX Design',
		author: 'Jane Levy',
		category: 'Design',
		description: 'Modern principles and practices for creating exceptional user experiences.',
		rating: 4
	}
];

export const Default: Story = {
	args: {
		heading: 'Inspiration & Recommended Reading',
		subtitle: 'Books that have shaped my approach to software architecture and development',
		books: mockBooks
	}
};

export const WithoutSubtitle: Story = {
	args: {
		heading: 'Recommended Reading',
		books: mockBooks
	}
};

export const SingleCategory: Story = {
	args: {
		heading: 'Architecture Books',
		subtitle: 'Essential reading for software architects',
		books: mockBooks.filter((book) => book.category === 'Architecture')
	}
};

export const WithoutRatings: Story = {
	args: {
		heading: 'Reading List',
		books: mockBooks.map((book) => ({ ...book, rating: undefined }))
	}
};
