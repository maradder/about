import { test, expect } from '@playwright/test';

test.describe('Contact Section Functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-testid="nav-contact"]').click();
	});

	test('displays email address as clickable mailto link', async ({ page }) => {
		const emailLink = page.locator('[data-testid="contact-email"]');
		await expect(emailLink).toBeVisible();
		await expect(emailLink).toContainText('marcusradder@gmail.com');

		const href = await emailLink.getAttribute('href');
		expect(href).toBe('mailto:marcusradder@gmail.com');
	});

	test('displays phone number with click-to-call functionality', async ({ page }) => {
		const phoneLink = page.locator('[data-testid="contact-phone"]');

		if ((await phoneLink.count()) > 0) {
			await expect(phoneLink).toBeVisible();
			await expect(phoneLink).toContainText('(360) 746-1255');

			const href = await phoneLink.getAttribute('href');
			expect(href).toBe('tel:+13607461255');
		}
	});

	test('provides working LinkedIn profile link', async ({ page }) => {
		const linkedinLink = page.locator('[data-testid="contact-linkedin"]');
		await expect(linkedinLink).toBeVisible();

		const href = await linkedinLink.getAttribute('href');
		expect(href).toBe('https://linkedin.com/in/marcusradder');

		const target = await linkedinLink.getAttribute('target');
		expect(target).toBe('_blank');
	});

	test('provides working GitHub profile link', async ({ page }) => {
		const githubLink = page.locator('[data-testid="contact-github"]');
		await expect(githubLink).toBeVisible();

		const href = await githubLink.getAttribute('href');
		expect(href).toBe('https://github.com/maradder');

		const target = await githubLink.getAttribute('target');
		expect(target).toBe('_blank');
	});

	test('displays all social media icons properly', async ({ page }) => {
		const socialLinks = page.locator('[data-testid="social-link"]');
		await expect(socialLinks).toHaveCount(2);

		for (let i = 0; i < (await socialLinks.count()); i++) {
			const link = socialLinks.nth(i);
			const icon = link.locator('[data-testid="social-icon"]');

			if ((await icon.count()) > 0) {
				await expect(icon).toBeVisible();
			}
		}
	});

	test('contact links open in new tabs where appropriate', async ({ page }) => {
		const externalLinks = page.locator('[data-testid="social-link"][target="_blank"]');

		for (let i = 0; i < (await externalLinks.count()); i++) {
			const link = externalLinks.nth(i);
			const href = await link.getAttribute('href');

			expect(href).toMatch(/^https?:\/\//);
		}
	});

	test('displays contact message encouraging engagement', async ({ page }) => {
		const contactMessage = page.locator('[data-testid="contact-message"]');

		if ((await contactMessage.count()) > 0) {
			await expect(contactMessage).toBeVisible();
			const messageText = await contactMessage.textContent();
			expect(messageText?.length).toBeGreaterThan(20);
		}
	});

	test('maintains accessibility with proper ARIA labels', async ({ page }) => {
		const contactSection = page.locator('[data-testid="contact-section"]');
		const hasAriaLabel = await contactSection.getAttribute('aria-label');
		const hasHeading = (await page.locator('[data-testid="contact-section"] h2').count()) > 0;

		expect(hasAriaLabel || hasHeading).toBeTruthy();

		// Check social links have descriptive labels
		const socialLinks = page.locator('[data-testid="social-link"]');
		for (let i = 0; i < Math.min(await socialLinks.count(), 3); i++) {
			const link = socialLinks.nth(i);
			const ariaLabel = await link.getAttribute('aria-label');
			const text = await link.textContent();

			expect(ariaLabel || (text && text.trim().length > 0)).toBeTruthy();
		}
	});

	test('is responsive on mobile devices', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const contactSection = page.locator('[data-testid="contact-section"]');
		await expect(contactSection).toBeVisible();

		// Check contact info stacks properly on mobile
		const contactInfo = page.locator('[data-testid="contact-info"]');
		const contactBox = await contactInfo.boundingBox();
		expect(contactBox?.width).toBeLessThanOrEqual(375);

		// Verify social links remain usable
		const socialLinks = page.locator('[data-testid="social-link"]');
		if ((await socialLinks.count()) > 0) {
			const firstLink = socialLinks.nth(0);
			const linkBox = await firstLink.boundingBox();
			expect(linkBox?.width).toBeGreaterThan(40); // Minimum touch target
			expect(linkBox?.height).toBeGreaterThan(40);
		}
	});
});
