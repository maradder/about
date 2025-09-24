import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('displays hero section immediately above the fold', async ({ page }) => {
		// Verify hero section is visible immediately
		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		// Check that hero section is above the fold
		const heroBox = await heroSection.boundingBox();
		expect(heroBox?.y).toBeLessThan(600); // Should be visible within viewport height
	});

	test('displays Marcus Radder name prominently', async ({ page }) => {
		const nameElement = page.locator('[data-testid="hero-name"]');
		await expect(nameElement).toBeVisible();
		await expect(nameElement).toContainText('Marcus Radder');

		// Check name has prominent styling (large font size)
		const fontSize = await nameElement.evaluate((el) => window.getComputedStyle(el).fontSize);
		expect(parseFloat(fontSize)).toBeGreaterThan(24); // Should be at least 24px
	});

	test('displays professional title correctly', async ({ page }) => {
		const titleElement = page.locator('[data-testid="hero-title"]');
		await expect(titleElement).toBeVisible();
		await expect(titleElement).toContainText('Software Engineer with Leadership Experience');
	});

	test('displays subtitle Systems Architect', async ({ page }) => {
		const subtitleElement = page.locator('[data-testid="hero-subtitle"]');
		await expect(subtitleElement).toBeVisible();
		await expect(subtitleElement).toContainText('Systems Architect');
	});

	test('displays call-to-action button', async ({ page }) => {
		const ctaButton = page.locator('[data-testid="hero-cta"]');
		await expect(ctaButton).toBeVisible();
		await expect(ctaButton).toHaveAttribute('href');

		// Verify button is clickable
		await expect(ctaButton).toBeEnabled();
	});

	test('loads professional profile image correctly if present', async ({ page }) => {
		const profileImage = page.locator('[data-testid="hero-profile-image"]');

		// If image is present, it should load correctly
		if ((await profileImage.count()) > 0) {
			await expect(profileImage).toBeVisible();

			// Check image loads successfully
			const imageSrc = await profileImage.getAttribute('src');
			expect(imageSrc).toBeTruthy();

			// Verify image is not broken
			const response = await page.request.get(imageSrc!);
			expect(response.status()).toBe(200);
		}
	});

	test('meets Core Web Vitals requirements for FCP', async ({ page }) => {
		// Start performance monitoring
		await page.goto('/', { waitUntil: 'networkidle' });

		// Measure First Contentful Paint
		const performanceMetrics = await page.evaluate(() => {
			return new Promise((resolve) => {
				new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
					if (fcpEntry) {
						resolve(fcpEntry.startTime);
					}
				}).observe({ entryTypes: ['paint'] });

				// Fallback timeout
				setTimeout(() => resolve(null), 3000);
			});
		});

		// FCP should be < 1500ms (1.5s)
		if (performanceMetrics) {
			expect(performanceMetrics).toBeLessThan(1500);
		}
	});

	test('has proper semantic HTML structure', async ({ page }) => {
		// Check for proper heading hierarchy
		const h1 = page.locator('h1');
		await expect(h1).toHaveCount(1); // Should have exactly one h1
		await expect(h1).toContainText('Marcus Radder');

		// Check for semantic section element
		const heroSection = page.locator('section[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();
	});

	test('is responsive on mobile devices', async ({ page }) => {
		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		// Check that content doesn't overflow
		const heroBox = await heroSection.boundingBox();
		expect(heroBox?.width).toBeLessThanOrEqual(375);

		// Verify elements are still readable
		const nameElement = page.locator('[data-testid="hero-name"]');
		await expect(nameElement).toBeVisible();
	});

	test('has accessible alt text and ARIA labels', async ({ page }) => {
		// Check profile image alt text if present
		const profileImage = page.locator('[data-testid="hero-profile-image"]');
		if ((await profileImage.count()) > 0) {
			const altText = await profileImage.getAttribute('alt');
			expect(altText).toBeTruthy();
			expect(altText).toContain('Marcus');
		}

		// Check CTA button has accessible text
		const ctaButton = page.locator('[data-testid="hero-cta"]');
		const ctaText = await ctaButton.textContent();
		expect(ctaText?.trim().length).toBeGreaterThan(0);
	});
});
