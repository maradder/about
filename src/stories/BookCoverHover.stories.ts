import type { Meta, StoryObj } from '@storybook/svelte';
import BookCoverHover from '$lib/components/ui/BookCoverHover.svelte';

const meta = {
	title: 'UI/BookCoverHover',
	component: BookCoverHover,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A hover component that displays book cover images when hovering over book cards.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		book: {
			description: 'Book object containing title and cover image',
			control: { type: 'object' }
		},
		x: {
			description: 'X coordinate for positioning the hover',
			control: { type: 'number' }
		},
		y: {
			description: 'Y coordinate for positioning the hover',
			control: { type: 'number' }
		},
		visible: {
			description: 'Whether the hover is visible',
			control: { type: 'boolean' }
		}
	}
} satisfies Meta<BookCoverHover>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBook = {
	title: 'Designing Data-Intensive Applications',
	author: 'Martin Kleppmann',
	category: 'System Design',
	description:
		'The definitive guide to building reliable, scalable, and maintainable systems that handle massive amounts of data.',
	rating: 5,
	coverImage:
		'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415816873i/23463279.jpg'
};

export const Default: Story = {
	args: {
		book: mockBook,
		x: 400,
		y: 200,
		visible: true
	}
};

export const ArchitectureBook: Story = {
	args: {
		book: {
			title: 'Software Architecture: The Hard Parts',
			author: 'Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani',
			category: 'Architecture',
			description: 'Modern approaches to software architecture and distributed systems design.',
			rating: 5,
			coverImage:
				'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1633963465i/58153482.jpg'
		},
		x: 300,
		y: 150,
		visible: true
	}
};

export const Hidden: Story = {
	args: {
		book: mockBook,
		x: 400,
		y: 200,
		visible: false
	}
};

export const WithoutCoverImage: Story = {
	args: {
		book: {
			...mockBook,
			coverImage: undefined,
			title: 'Book Without Cover'
		},
		x: 400,
		y: 200,
		visible: true
	}
};

export const SadRobotPlaceholder: Story = {
	args: {
		book: {
			title: 'Missing Cover Book',
			author: 'Unknown Author',
			category: 'Test',
			description:
				'This book demonstrates the sad ASCII robot placeholder when no cover is available.',
			rating: 3
		},
		x: 300,
		y: 150,
		visible: true
	}
};
