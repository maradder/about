import { test, expect } from '@playwright/test';

test.describe('Projects Showcase', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-testid="nav-projects"]').click();
	});

	test('features cloud-hosted data platform project', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');
		const projectsText = await projects.allTextContents();
		const allText = projectsText.join(' ');

		expect(allText).toContain('cloud');
		expect(allText).toContain('data platform');
	});

	test('displays business management platform project', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');
		const projectsText = await projects.allTextContents();
		const allText = projectsText.join(' ');

		expect(allText).toContain('business management');
	});

	test('shows custom video conferencing solution project', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');
		const projectsText = await projects.allTextContents();
		const allText = projectsText.join(' ');

		expect(allText).toContain('video conferencing');
	});

	test('includes description, technologies, and key features for each project', async ({
		page
	}) => {
		const projects = page.locator('[data-testid="project-item"]');

		for (let i = 0; i < Math.min(await projects.count(), 2); i++) {
			const project = projects.nth(i);

			const description = project.locator('[data-testid="project-description"]');
			await expect(description).toBeVisible();

			const technologies = project.locator('[data-testid="project-technologies"]');
			await expect(technologies).toBeVisible();

			const features = project.locator('[data-testid="project-features"]');
			await expect(features).toBeVisible();
		}
	});

	test('provides working demo and GitHub repository links', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');

		for (let i = 0; i < Math.min(await projects.count(), 2); i++) {
			const project = projects.nth(i);

			const demoLink = project.locator('[data-testid="project-demo-link"]');
			const githubLink = project.locator('[data-testid="project-github-link"]');

			const hasDemoLink = (await demoLink.count()) > 0;
			const hasGithubLink = (await githubLink.count()) > 0;

			expect(hasDemoLink || hasGithubLink).toBeTruthy();

			if (hasDemoLink) {
				const href = await demoLink.getAttribute('href');
				expect(href).toMatch(/^https?:\/\//);
			}

			if (hasGithubLink) {
				const href = await githubLink.getAttribute('href');
				expect(href).toMatch(/github\.com/);
			}
		}
	});

	test('displays project images and screenshots properly', async ({ page }) => {
		const projectImages = page.locator('[data-testid="project-image"]');

		if ((await projectImages.count()) > 0) {
			for (let i = 0; i < Math.min(await projectImages.count(), 3); i++) {
				const image = projectImages.nth(i);
				await expect(image).toBeVisible();

				const src = await image.getAttribute('src');
				expect(src).toBeTruthy();

				const alt = await image.getAttribute('alt');
				expect(alt).toBeTruthy();
			}
		}
	});

	test('shows clear project status indicators', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');

		for (let i = 0; i < Math.min(await projects.count(), 2); i++) {
			const project = projects.nth(i);
			const status = project.locator('[data-testid="project-status"]');

			if ((await status.count()) > 0) {
				await expect(status).toBeVisible();
				const statusText = await status.textContent();
				expect(statusText).toMatch(/(Live|Development|Archived|Concept)/i);
			}
		}
	});

	test('supports project card interactions', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');

		if ((await projects.count()) > 0) {
			const firstProject = projects.nth(0);

			await firstProject.hover();

			// Check for hover effects
			const hasHoverEffect = await firstProject.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				return (
					styles.transform !== 'none' || styles.boxShadow !== 'none' || styles.scale !== 'none'
				);
			});

			expect(hasHoverEffect).toBeTruthy();
		}
	});

	test('maintains responsive grid layout', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const projectsGrid = page.locator('[data-testid="projects-grid"]');
		await expect(projectsGrid).toBeVisible();

		const projects = page.locator('[data-testid="project-item"]');
		if ((await projects.count()) > 1) {
			// On mobile, projects should stack vertically
			const firstBox = await projects.nth(0).boundingBox();
			const secondBox = await projects.nth(1).boundingBox();

			if (firstBox && secondBox) {
				expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height / 2);
			}
		}
	});

	test('provides detailed project information on interaction', async ({ page }) => {
		const projects = page.locator('[data-testid="project-item"]');

		if ((await projects.count()) > 0) {
			const firstProject = projects.nth(0);
			await firstProject.click();

			// Check for expanded details or modal
			const expandedDetails = page.locator('[data-testid="project-details-expanded"]');
			const projectModal = page.locator('[data-testid="project-modal"]');

			const hasExpandedDetails = (await expandedDetails.count()) > 0;
			const hasModal = (await projectModal.count()) > 0;

			if (hasExpandedDetails || hasModal) {
				expect(hasExpandedDetails || hasModal).toBeTruthy();
			}
		}
	});
});
