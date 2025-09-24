// Portfolio TypeScript Interfaces
// Generated from contracts/component-interfaces.ts

// Core section interfaces
export interface HeroSectionProps {
	name: string;
	title: string;
	subtitle: string;
	tagline?: string;
	ctaText: string;
	ctaLink: string;
	backgroundImage?: string;
	profileImage?: string;
}

export interface AboutSectionProps {
	heading: string;
	narrative: string;
	highlights: string[];
	personalTouch?: string;
	resumeLink?: string;
}

export interface Skill {
	name: string;
	proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar' | 'Hobby projects';
	yearsExperience?: number;
	iconPath?: string;
}

export interface SkillCategory {
	name: string;
	skills: Skill[];
	displayOrder: number;
}

export interface SkillsSectionProps {
	heading: string;
	categories: SkillCategory[];
}

export interface Position {
	title: string;
	company: string;
	companyUrl?: string;
	location: string;
	startDate: string; // YYYY-MM
	endDate: string; // YYYY-MM or "Present"
	achievements: string[];
	technologies: string[];
	isCurrent: boolean;
}

export interface ExperienceSectionProps {
	heading: string;
	positions: Position[];
}

export interface Project {
	name: string;
	description: string;
	longDescription: string;
	technologies: string[];
	features: string[];
	demoUrl?: string;
	githubUrl?: string;
	images: string[];
	status: 'Live' | 'In Development' | 'Archived' | 'Concept';
	startDate: string;
	endDate: string; // or "Ongoing"
}

export interface ProjectsSectionProps {
	heading: string;
	projects: Project[];
}

export interface SocialLink {
	platform: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Website' | 'Other';
	url: string;
	handle: string;
	iconPath: string;
}

export interface ContactSectionProps {
	heading: string;
	email?: string;
	phone?: string;
	socialLinks: SocialLink[];
	contactMessage?: string;
}

export interface NavigationItem {
	label: string;
	anchor: string;
	order: number;
	isActive: boolean;
}

export interface NavigationProps {
	brand: string;
	logoPath?: string;
	menuItems: NavigationItem[];
	mobileBreakpoint: number;
}

export interface Book {
	title: string;
	author: string;
	category?: string;
	description?: string;
	amazonLink?: string;
	coverImage?: string;
	rating?: number;
}

export interface ReadingSectionProps {
	heading: string;
	subtitle?: string;
	books: Book[];
}

// Page-level contract
export interface PortfolioPageData {
	hero: HeroSectionProps;
	about: AboutSectionProps;
	skills: SkillsSectionProps;
	experience: ExperienceSectionProps;
	projects: ProjectsSectionProps;
	reading: ReadingSectionProps;
	contact: ContactSectionProps;
	navigation: NavigationProps;
}

// Component behavior contracts
export interface ScrollAnimationConfig {
	threshold: number;
	rootMargin: string;
	triggerOnce: boolean;
}

export interface ResponsiveBreakpoints {
	mobile: number;
	tablet: number;
	desktop: number;
	widescreen: number;
}

export interface ThemeConfig {
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		neutral: string;
		background: string;
		surface: string;
		text: string;
	};
	typography: {
		fontFamily: {
			sans: string[];
			mono: string[];
		};
		fontSize: Record<string, string>;
		lineHeight: Record<string, string>;
	};
	spacing: Record<string, string>;
	borderRadius: Record<string, string>;
}

// Event contracts
export interface NavigationClickEvent {
	anchor: string;
	label: string;
	preventDefault: () => void;
}

export interface ContactFormEvent {
	email: string;
	message: string;
	subject?: string;
}

export interface ProjectInteractionEvent {
	projectName: string;
	action: 'view_demo' | 'view_code' | 'view_details';
	url?: string;
}
