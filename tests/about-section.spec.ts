import { test, expect } from '@playwright/test';

test.describe('About Section Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('navigates to about section via navigation menu', async ({ page }) => {
		// Click About in navigation
		const aboutNavLink = page.locator('[data-testid="nav-about"]');
		await expect(aboutNavLink).toBeVisible();
		await aboutNavLink.click();

		// Verify about section is visible
		const aboutSection = page.locator('[data-testid="about-section"]');
		await expect(aboutSection).toBeVisible();

		// Check URL fragment
		await expect(page).toHaveURL(/#about/);
	});

	test('smooth scroll transition to about section', async ({ page }) => {
		// Get initial scroll position
		const initialScrollY = await page.evaluate(() => window.scrollY);

		// Click About navigation
		await page.locator('[data-testid="nav-about"]').click();

		// Wait for scroll animation to complete
		await page.waitForTimeout(1000);

		// Verify scroll position changed
		const finalScrollY = await page.evaluate(() => window.scrollY);
		expect(finalScrollY).toBeGreaterThan(initialScrollY);

		// Verify about section is in viewport
		const aboutSection = page.locator('[data-testid="about-section"]');
		const aboutBox = await aboutSection.boundingBox();
		const viewportHeight = page.viewportSize()?.height || 800;

		expect(aboutBox?.y).toBeLessThan(viewportHeight);
		expect(aboutBox?.y).toBeGreaterThan(-100); // Not scrolled past
	});

	test('displays professional narrative clearly', async ({ page }) => {
		await page.locator('[data-testid="nav-about"]').click();

		const narrativeElement = page.locator('[data-testid="about-narrative"]');
		await expect(narrativeElement).toBeVisible();

		// Check narrative contains key information
		const narrativeText = await narrativeElement.textContent();
		expect(narrativeText).toContain('Systems Architect');
		expect(narrativeText).toContain('Intelligence'); // Reference to intelligence background

		// Verify readability (reasonable line length)
		const narrativeBox = await narrativeElement.boundingBox();
		expect(narrativeBox?.width).toBeLessThan(800); // Good reading width
	});

	test('highlights career progression from intelligence analyst to systems architect', async ({
		page
	}) => {
		await page.locator('[data-testid="nav-about"]').click();

		// Check for career progression highlights
		const highlightsSection = page.locator('[data-testid="about-highlights"]');
		await expect(highlightsSection).toBeVisible();

		const highlightsText = await highlightsSection.textContent();
		expect(highlightsText).toContain('Intelligence'); // Previous role
		expect(highlightsText).toContain('Architect'); // Current role
	});

	test('displays key highlights as organized content', async ({ page }) => {
		await page.locator('[data-testid="nav-about"]').click();

		// Check for structured highlights
		const highlights = page.locator('[data-testid="about-highlight-item"]');
		await expect(highlights).toHaveCount(4);

		// Verify highlights are visually organized
		for (let i = 0; i < (await highlights.count()); i++) {
			const highlight = highlights.nth(i);
			await expect(highlight).toBeVisible();

			const text = await highlight.textContent();
			expect(text?.trim().length).toBeGreaterThan(10);
		}
	});

	test('provides accessible resume/CV link when present', async ({ page }) => {
		await page.locator('[data-testid="nav-about"]').click();

		const resumeLink = page.locator('[data-testid="about-resume-link"]');

		if ((await resumeLink.count()) > 0) {
			await expect(resumeLink).toBeVisible();

			// Check link has proper href
			const href = await resumeLink.getAttribute('href');
			expect(href).toBeTruthy();

			// Check link text is descriptive
			const linkText = await resumeLink.textContent();
			expect(linkText?.toLowerCase()).toMatch(/(resume|cv|download)/);

			// Verify link opens in new tab for external resources
			const target = await resumeLink.getAttribute('target');
			if (href?.startsWith('http') || href?.endsWith('.pdf')) {
				expect(target).toBe('_blank');
			}
		}
	});

	test('follows semantic HTML structure with proper headings', async ({ page }) => {
		await page.locator('[data-testid="nav-about"]').click();

		// Check for section element
		const aboutSection = page.locator('section[data-testid="about-section"]');
		await expect(aboutSection).toBeVisible();

		// Check for proper heading hierarchy
		const sectionHeading = page.locator('[data-testid="about-section"] h2');
		await expect(sectionHeading).toBeVisible();
		await expect(sectionHeading).toContainText(/about/i);

		// Verify no h1 elements in section (should only be in hero)
		const h1InSection = page.locator('[data-testid="about-section"] h1');
		await expect(h1InSection).toHaveCount(0);
	});

	test('content is readable on mobile devices', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		await page.locator('[data-testid="nav-about"]').click();

		const aboutSection = page.locator('[data-testid="about-section"]');
		await expect(aboutSection).toBeVisible();

		// Check content doesn't overflow
		const aboutBox = await aboutSection.boundingBox();
		expect(aboutBox?.width).toBeLessThanOrEqual(375);

		// Verify text is readable (not too small)
		const narrativeElement = page.locator('[data-testid="about-narrative"]');
		const fontSize = await narrativeElement.evaluate((el) => window.getComputedStyle(el).fontSize);
		expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14); // Minimum readable size
	});

	test('supports keyboard navigation', async ({ page }) => {
		// Focus on about navigation link
		await page.locator('[data-testid="nav-about"]').focus();

		// Verify focus is visible
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toHaveAttribute('data-testid', 'nav-about');

		// Press Enter to navigate
		await page.keyboard.press('Enter');

		// Verify navigation worked
		await expect(page).toHaveURL(/#about/);
		const aboutSection = page.locator('[data-testid="about-section"]');
		await expect(aboutSection).toBeVisible();
	});

	test('maintains navigation state when scrolling', async ({ page }) => {
		// Navigate to about section
		await page.locator('[data-testid="nav-about"]').click();

		// Wait for scroll and navigation update
		await page.waitForTimeout(500);

		// Check that about nav item is marked as active
		const aboutNavLink = page.locator('[data-testid="nav-about"]');
		await expect(aboutNavLink).toHaveClass(/active|current/);

		// Verify other nav items are not active
		const homeNavLink = page.locator('[data-testid="nav-home"]');
		if ((await homeNavLink.count()) > 0) {
			await expect(homeNavLink).not.toHaveClass(/active|current/);
		}
	});

	test('loads section content progressively for performance', async ({ page }) => {
		// Start navigation
		const aboutNavPromise = page.locator('[data-testid="nav-about"]').click();

		// Check that about section appears quickly
		const aboutSection = page.locator('[data-testid="about-section"]');
		await expect(aboutSection).toBeVisible({ timeout: 2000 });

		await aboutNavPromise;

		// Verify content loads without layout shifts
		const initialBox = await aboutSection.boundingBox();
		await page.waitForTimeout(500);
		const finalBox = await aboutSection.boundingBox();

		// Position shouldn't shift significantly (CLS requirement)
		if (initialBox && finalBox) {
			expect(Math.abs(initialBox.y - finalBox.y)).toBeLessThan(10);
		}
	});
});
