import { test, expect } from '@playwright/test';

test.describe('Skills Section Interaction', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-testid="nav-skills"]').click();
	});

	test('displays skills organized in logical categories', async ({ page }) => {
		const skillsSection = page.locator('[data-testid="skills-section"]');
		await expect(skillsSection).toBeVisible();

		// Check for multiple skill categories
		const categories = page.locator('[data-testid="skill-category"]');
		await expect(categories).toHaveCount(3);

		// Verify category names are descriptive
		const categoryTitles = page.locator('[data-testid="skill-category-title"]');
		const categoriesText = await categoryTitles.allTextContents();

		expect(
			categoriesText.some(
				(title) =>
					title.toLowerCase().includes('language') ||
					title.toLowerCase().includes('cloud') ||
					title.toLowerCase().includes('tool')
			)
		).toBeTruthy();
	});

	test('prominently features core technologies', async ({ page }) => {
		const skillsSection = page.locator('[data-testid="skills-section"]');
		await expect(skillsSection).toBeVisible();

		// Check for key technologies mentioned in requirements
		const skillItems = page.locator('[data-testid="skill-item"]');
		const skillsText = await skillItems.allTextContents();
		const skillsString = skillsText.join(' ');

		expect(skillsString).toContain('Python');
		expect(skillsString).toContain('TypeScript');
		expect(skillsString).toMatch(/(Azure|AWS)/);
		expect(skillsString).toContain('System Architecture');
	});

	test('includes specified tools and technologies', async ({ page }) => {
		const skillItems = page.locator('[data-testid="skill-item"]');
		const skillsText = await skillItems.allTextContents();
		const skillsString = skillsText.join(' ');

		// Verify required tools from specification
		expect(skillsString).toContain('Docker');
		expect(skillsString).toContain('GitLab CI/CD');
		expect(skillsString).toContain('MongoDB');
		expect(skillsString).toContain('PostgreSQL');
		expect(skillsString).toContain('Tailwind CSS');
		expect(skillsString).toContain('Figma');
	});

	test('displays proficiency levels or experience indicators', async ({ page }) => {
		const skillItems = page.locator('[data-testid="skill-item"]');

		for (let i = 0; i < Math.min(await skillItems.count(), 5); i++) {
			const skill = skillItems.nth(i);

			// Check for proficiency indicator (text or visual)
			const proficiencyElement = skill.locator('[data-testid="skill-proficiency"]');
			const yearsElement = skill.locator('[data-testid="skill-years"]');

			const hasProficiency = (await proficiencyElement.count()) > 0;
			const hasYears = (await yearsElement.count()) > 0;

			expect(hasProficiency || hasYears).toBeTruthy();
		}
	});

	test('maintains visual hierarchy for easy scanning', async ({ page }) => {
		const skillsSection = page.locator('[data-testid="skills-section"]');

		// Check section heading
		const sectionHeading = page.locator('[data-testid="skills-section"] h2');
		await expect(sectionHeading).toBeVisible();

		// Verify category titles are prominent
		const categoryTitles = page.locator('[data-testid="skill-category-title"]');
		for (let i = 0; i < (await categoryTitles.count()); i++) {
			const title = categoryTitles.nth(i);
			const fontSize = await title.evaluate((el) => window.getComputedStyle(el).fontSize);
			expect(parseFloat(fontSize)).toBeGreaterThan(16); // Should be prominent
		}

		// Check visual separation between categories
		const categories = page.locator('[data-testid="skill-category"]');
		if ((await categories.count()) > 1) {
			const firstCategory = categories.nth(0);
			const secondCategory = categories.nth(1);

			const firstBox = await firstCategory.boundingBox();
			const secondBox = await secondCategory.boundingBox();

			if (firstBox && secondBox) {
				expect(secondBox.y - (firstBox.y + firstBox.height)).toBeGreaterThan(10);
			}
		}
	});

	test('supports interactive skill exploration', async ({ page }) => {
		const skillItems = page.locator('[data-testid="skill-item"]');

		if ((await skillItems.count()) > 0) {
			const firstSkill = skillItems.nth(0);

			// Test hover interaction if implemented
			await firstSkill.hover();

			// Check for any interactive feedback (tooltip, highlight, etc.)
			const hasTooltip = (await page.locator('[data-testid="skill-tooltip"]').count()) > 0;
			const hasHighlight = await firstSkill.evaluate(
				(el) => window.getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)'
			);

			// At least some form of interaction should be present
			expect(hasTooltip || hasHighlight).toBeTruthy();
		}
	});

	test('follows category display order correctly', async ({ page }) => {
		const categories = page.locator('[data-testid="skill-category"]');
		const categoryTitles = page.locator('[data-testid="skill-category-title"]');

		const titles = await categoryTitles.allTextContents();

		// Verify logical ordering (languages/core first, tools/design last)
		const firstCategory = titles[0].toLowerCase();
		const lastCategory = titles[titles.length - 1].toLowerCase();

		expect(firstCategory).toMatch(/(language|core|programming)/);
		expect(lastCategory).toMatch(/(tool|design|other)/);
	});

	test('displays skill icons when available', async ({ page }) => {
		const skillItems = page.locator('[data-testid="skill-item"]');

		let hasIcons = false;
		for (let i = 0; i < Math.min(await skillItems.count(), 5); i++) {
			const skill = skillItems.nth(i);
			const icon = skill.locator('[data-testid="skill-icon"]');

			if ((await icon.count()) > 0) {
				await expect(icon).toBeVisible();
				hasIcons = true;

				// Verify icon loads correctly
				const iconSrc = await icon.getAttribute('src');
				if (iconSrc) {
					expect(iconSrc).toBeTruthy();
				}
			}
		}

		// At least some skills should have icons for visual appeal
		expect(hasIcons).toBeTruthy();
	});

	test('is responsive on mobile devices', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const skillsSection = page.locator('[data-testid="skills-section"]');
		await expect(skillsSection).toBeVisible();

		// Check categories stack vertically on mobile
		const categories = page.locator('[data-testid="skill-category"]');
		if ((await categories.count()) > 1) {
			const firstBox = await categories.nth(0).boundingBox();
			const secondBox = await categories.nth(1).boundingBox();

			if (firstBox && secondBox) {
				expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height / 2);
			}
		}

		// Verify content doesn't overflow
		const sectionBox = await skillsSection.boundingBox();
		expect(sectionBox?.width).toBeLessThanOrEqual(375);
	});

	test('maintains accessibility standards', async ({ page }) => {
		// Check section has proper ARIA label or heading
		const skillsSection = page.locator('[data-testid="skills-section"]');
		const hasAriaLabel = await skillsSection.getAttribute('aria-label');
		const hasHeading = (await page.locator('[data-testid="skills-section"] h2').count()) > 0;

		expect(hasAriaLabel || hasHeading).toBeTruthy();

		// Verify skill items have accessible text
		const skillItems = page.locator('[data-testid="skill-item"]');
		for (let i = 0; i < Math.min(await skillItems.count(), 3); i++) {
			const skill = skillItems.nth(i);
			const text = await skill.textContent();
			expect(text?.trim().length).toBeGreaterThan(0);
		}

		// Check color contrast for skill proficiency indicators
		const proficiencyElements = page.locator('[data-testid="skill-proficiency"]');
		if ((await proficiencyElements.count()) > 0) {
			const firstProficiency = proficiencyElements.nth(0);
			await expect(firstProficiency).toBeVisible();
		}
	});

	test('loads efficiently without performance issues', async ({ page }) => {
		// Measure time to display skills section
		const startTime = Date.now();

		await page.locator('[data-testid="nav-skills"]').click();
		await page.locator('[data-testid="skills-section"]').waitFor({ state: 'visible' });

		const loadTime = Date.now() - startTime;
		expect(loadTime).toBeLessThan(2000); // Should load within 2 seconds

		// Check for layout stability
		const skillsSection = page.locator('[data-testid="skills-section"]');
		const initialBox = await skillsSection.boundingBox();

		await page.waitForTimeout(500);

		const finalBox = await skillsSection.boundingBox();
		if (initialBox && finalBox) {
			expect(Math.abs(initialBox.height - finalBox.height)).toBeLessThan(20);
		}
	});
});
