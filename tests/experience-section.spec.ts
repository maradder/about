import { test, expect } from '@playwright/test';

test.describe('Experience Timeline', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-testid="nav-experience"]').click();
	});

	test('prominently displays current Systems Architect role', async ({ page }) => {
		const currentPosition = page.locator('[data-testid="position-current"]');
		await expect(currentPosition).toBeVisible();

		const positionText = await currentPosition.textContent();
		expect(positionText).toContain('Systems Architect');
		expect(positionText).toContain('Occam Solutions');
		expect(positionText).toContain('11/2024');
		expect(positionText).toContain('Present');
	});

	test('shows progression through senior engineer roles', async ({ page }) => {
		const positions = page.locator('[data-testid="position-item"]');
		await expect(positions).toHaveCount(1);

		const positionsText = await positions.allTextContents();
		const allText = positionsText.join(' ');

		expect(allText).toMatch(/(Senior|Lead|Principal).*Engineer/);
		expect(allText).toContain('Software Engineer');
	});

	test('includes company, dates, location, and achievements for each position', async ({
		page
	}) => {
		const positions = page.locator('[data-testid="position-item"]');

		for (let i = 0; i < Math.min(await positions.count(), 3); i++) {
			const position = positions.nth(i);

			// Check for company
			const company = position.locator('[data-testid="position-company"]');
			await expect(company).toBeVisible();

			// Check for dates
			const dates = position.locator('[data-testid="position-dates"]');
			await expect(dates).toBeVisible();

			// Check for location
			const location = position.locator('[data-testid="position-location"]');
			await expect(location).toBeVisible();

			// Check for achievements
			const achievements = position.locator('[data-testid="position-achievement"]');
			await expect(achievements).toHaveCount(3);
		}
	});

	test('displays technologies used in each role', async ({ page }) => {
		const positions = page.locator('[data-testid="position-item"]');

		for (let i = 0; i < Math.min(await positions.count(), 2); i++) {
			const position = positions.nth(i);
			const technologies = position.locator('[data-testid="position-tech"]');

			if ((await technologies.count()) > 0) {
				await expect(technologies).toBeVisible();
				const techText = await technologies.textContent();
				expect(techText?.trim().length).toBeGreaterThan(0);
			}
		}
	});

	test('organizes timeline chronologically (newest first)', async ({ page }) => {
		const positions = page.locator('[data-testid="position-item"]');
		const dates = page.locator('[data-testid="position-dates"]');

		if ((await dates.count()) > 1) {
			const firstDate = await dates.nth(0).textContent();
			const secondDate = await dates.nth(1).textContent();

			// First position should be more recent
			expect(firstDate).toMatch(/(Present|2024|2023)/);

			if (secondDate && !secondDate.includes('Present')) {
				const firstYear = firstDate?.match(/20\d{2}/)?.[0];
				const secondYear = secondDate?.match(/20\d{2}/)?.[0];

				if (firstYear && secondYear) {
					expect(parseInt(firstYear)).toBeGreaterThanOrEqual(parseInt(secondYear));
				}
			}
		}
	});

	test('uses visual timeline design for comprehension', async ({ page }) => {
		const timelineContainer = page.locator('[data-testid="experience-timeline"]');
		await expect(timelineContainer).toBeVisible();

		// Check for visual timeline elements (line, dots, etc.)
		const timelineElements = page.locator('[data-testid="timeline-element"]');
		const timelineDots = page.locator('[data-testid="timeline-dot"]');
		const timelineLine = page.locator('[data-testid="timeline-line"]');

		const hasTimelineElements = (await timelineElements.count()) > 0;
		const hasTimelineDots = (await timelineDots.count()) > 0;
		const hasTimelineLine = (await timelineLine.count()) > 0;

		expect(hasTimelineElements || hasTimelineDots || hasTimelineLine).toBeTruthy();
	});

	test('highlights key achievements for each position', async ({ page }) => {
		const positions = page.locator('[data-testid="position-item"]');

		for (let i = 0; i < Math.min(await positions.count(), 2); i++) {
			const position = positions.nth(i);
			const achievements = position.locator('[data-testid="position-achievement"]');

			await expect(achievements).toHaveCount(3);

			// Check achievement content quality
			for (let j = 0; j < Math.min(await achievements.count(), 2); j++) {
				const achievement = achievements.nth(j);
				const text = await achievement.textContent();
				expect(text?.trim().length).toBeGreaterThan(20); // Substantial achievement descriptions
			}
		}
	});

	test('provides interactive hover effects', async ({ page }) => {
		const positions = page.locator('[data-testid="position-item"]');

		if ((await positions.count()) > 0) {
			const firstPosition = positions.nth(0);

			// Test hover interaction
			await firstPosition.hover();

			// Check for visual feedback (could be background change, shadow, etc.)
			const hasHoverEffect = await firstPosition.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				return (
					styles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
					styles.boxShadow !== 'none' ||
					styles.transform !== 'none'
				);
			});

			expect(hasHoverEffect).toBeTruthy();
		}
	});

	test('maintains accessibility with proper ARIA labels', async ({ page }) => {
		// Check section accessibility
		const experienceSection = page.locator('[data-testid="experience-section"]');
		const hasAriaLabel = await experienceSection.getAttribute('aria-label');
		const hasHeading = (await page.locator('[data-testid="experience-section"] h2').count()) > 0;

		expect(hasAriaLabel || hasHeading).toBeTruthy();

		// Check position items have proper structure
		const positions = page.locator('[data-testid="position-item"]');
		for (let i = 0; i < Math.min(await positions.count(), 2); i++) {
			const position = positions.nth(i);
			const positionTitle = position.locator('[data-testid="position-title"]');
			await expect(positionTitle).toBeVisible();
		}
	});

	test('is responsive on mobile devices', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const experienceSection = page.locator('[data-testid="experience-section"]');
		await expect(experienceSection).toBeVisible();

		// Check timeline adapts to mobile layout
		const positions = page.locator('[data-testid="position-item"]');
		if ((await positions.count()) > 0) {
			const firstPosition = positions.nth(0);
			const positionBox = await firstPosition.boundingBox();
			expect(positionBox?.width).toBeLessThanOrEqual(375);
		}

		// Verify content remains readable
		const positionTitles = page.locator('[data-testid="position-title"]');
		if ((await positionTitles.count()) > 0) {
			const fontSize = await positionTitles
				.nth(0)
				.evaluate((el) => window.getComputedStyle(el).fontSize);
			expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);
		}
	});
});
