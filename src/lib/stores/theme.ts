import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const THEME_COOKIE_NAME = 'theme-preference';

function getSystemTheme(): ResolvedTheme {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
	if (!browser) return 'system';

	// First check for cookie
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith(THEME_COOKIE_NAME + '='))
		?.split('=')[1];

	if (cookieValue && ['light', 'dark', 'system'].includes(cookieValue)) {
		return cookieValue as Theme;
	}

	return 'system';
}

function setThemeCookie(theme: Theme) {
	if (!browser) return;

	// Set cookie to expire in 1 year
	const expires = new Date();
	expires.setFullYear(expires.getFullYear() + 1);

	document.cookie = `${THEME_COOKIE_NAME}=${theme}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function resolveTheme(theme: Theme): ResolvedTheme {
	return theme === 'system' ? getSystemTheme() : theme;
}

function applyTheme(resolvedTheme: ResolvedTheme) {
	if (!browser) return;

	const root = document.documentElement;
	const isDark = resolvedTheme === 'dark';

	if (isDark) {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}

	// Set CSS custom property for smooth transitions
	root.style.setProperty('--theme-transition-duration', '400ms');
}

// Create stores
export const theme = writable<Theme>('system');
export const resolvedTheme = writable<ResolvedTheme>('light');

// Initialize theme on client
function initializeTheme() {
	if (!browser) return;

	const storedTheme = getStoredTheme();
	const resolved = resolveTheme(storedTheme);

	theme.set(storedTheme);
	resolvedTheme.set(resolved);
	applyTheme(resolved);

	// Listen for system theme changes
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	const handleSystemThemeChange = () => {
		theme.update((currentTheme) => {
			if (currentTheme === 'system') {
				const newResolved = getSystemTheme();
				resolvedTheme.set(newResolved);
				applyTheme(newResolved);
			}
			return currentTheme;
		});
	};

	mediaQuery.addEventListener('change', handleSystemThemeChange);

	// Cleanup function (for SSR compatibility)
	return () => {
		mediaQuery.removeEventListener('change', handleSystemThemeChange);
	};
}

// Theme setter function
export function setTheme(newTheme: Theme) {
	if (!browser) return;

	setThemeCookie(newTheme);
	theme.set(newTheme);

	const resolved = resolveTheme(newTheme);
	resolvedTheme.set(resolved);
	applyTheme(resolved);
}

// Cycle through themes for toggle functionality
export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme =
			currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light';
		setTheme(newTheme);
		return newTheme;
	});
}

// Initialize on import (client-side only)
if (browser) {
	initializeTheme();
}
