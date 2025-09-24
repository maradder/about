import { test, expect } from '@playwright/test';

test.describe('Responsive Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('displays navigation menu on desktop', async ({ page }) => {
		const navigation = page.locator('[data-testid="navigation"]');
		await expect(navigation).toBeVisible();

		const menuItems = page.locator('[data-testid="nav-menu-item"]');
		await expect(menuItems).toHaveCount(6);

		// Check all menu items are visible on desktop
		for (let i = 0; i < (await menuItems.count()); i++) {
			await expect(menuItems.nth(i)).toBeVisible();
		}
	});

	test('collapses to hamburger menu on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const hamburgerButton = page.locator('[data-testid="nav-hamburger"]');
		await expect(hamburgerButton).toBeVisible();

		// Menu items should be hidden on mobile initially
		const menuItems = page.locator('[data-testid="nav-menu-item"]');
		const firstMenuItem = menuItems.nth(0);

		const isVisible = await firstMenuItem.isVisible();
		expect(isVisible).toBeFalsy();
	});

	test('opens mobile menu when hamburger is clicked', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const hamburgerButton = page.locator('[data-testid="nav-hamburger"]');
		await hamburgerButton.click();

		// Menu should now be visible
		const mobileMenu = page.locator('[data-testid="nav-mobile-menu"]');
		await expect(mobileMenu).toBeVisible();

		const menuItems = page.locator('[data-testid="nav-menu-item"]');
		for (let i = 0; i < Math.min(await menuItems.count(), 3); i++) {
			await expect(menuItems.nth(i)).toBeVisible();
		}
	});

	test('closes mobile menu when menu item is clicked', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		// Open mobile menu
		const hamburgerButton = page.locator('[data-testid="nav-hamburger"]');
		await hamburgerButton.click();

		// Click a menu item
		const aboutLink = page.locator('[data-testid="nav-about"]');
		await aboutLink.click();

		// Menu should close
		const mobileMenu = page.locator('[data-testid="nav-mobile-menu"]');
		await expect(mobileMenu).not.toBeVisible();
	});

	test('maintains brand/logo visibility across breakpoints', async ({ page }) => {
		const brand = page.locator('[data-testid="nav-brand"]');
		await expect(brand).toBeVisible();

		// Check on mobile
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(brand).toBeVisible();

		// Check on tablet
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(brand).toBeVisible();
	});

	test('highlights active navigation item correctly', async ({ page }) => {
		// Navigate to about section
		await page.locator('[data-testid="nav-about"]').click();

		const aboutNavItem = page.locator('[data-testid="nav-about"]');
		await expect(aboutNavItem).toHaveClass(/active|current/);

		// Other items should not be active
		const homeNavItem = page.locator('[data-testid="nav-home"]');
		if ((await homeNavItem.count()) > 0) {
			await expect(homeNavItem).not.toHaveClass(/active|current/);
		}
	});

	test('supports keyboard navigation', async ({ page }) => {
		// Tab through navigation items
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');

		const focusedElement = page.locator(':focus');
		const navItems = page.locator('[data-testid="nav-menu-item"]');

		let foundFocusedNavItem = false;
		for (let i = 0; i < (await navItems.count()); i++) {
			const navItem = navItems.nth(i);
			if (await navItem.evaluate((el) => el === document.activeElement)) {
				foundFocusedNavItem = true;
				break;
			}
		}

		expect(foundFocusedNavItem).toBeTruthy();
	});

	test('navigation links scroll to correct sections', async ({ page }) => {
		// Click skills navigation
		await page.locator('[data-testid="nav-skills"]').click();

		// Verify URL fragment
		await expect(page).toHaveURL(/#skills/);

		// Verify skills section is visible
		const skillsSection = page.locator('[data-testid="skills-section"]');
		await expect(skillsSection).toBeVisible();
	});

	test('navigation is sticky/fixed during scroll', async ({ page }) => {
		const navigation = page.locator('[data-testid="navigation"]');

		// Get initial position
		const initialBox = await navigation.boundingBox();

		// Scroll down
		await page.evaluate(() => window.scrollTo(0, 500));

		// Navigation should still be visible and in same position
		await expect(navigation).toBeVisible();
		const scrolledBox = await navigation.boundingBox();

		expect(scrolledBox?.y).toBeLessThanOrEqual(initialBox?.y || 100);
	});

	test('touch targets are appropriately sized on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		// Open mobile menu
		const hamburgerButton = page.locator('[data-testid="nav-hamburger"]');
		await hamburgerButton.click();

		// Check touch target sizes
		const menuItems = page.locator('[data-testid="nav-menu-item"]');
		for (let i = 0; i < Math.min(await menuItems.count(), 3); i++) {
			const item = menuItems.nth(i);
			const box = await item.boundingBox();

			// WCAG recommends minimum 44px touch targets
			expect(box?.width).toBeGreaterThanOrEqual(44);
			expect(box?.height).toBeGreaterThanOrEqual(44);
		}
	});

	test('navigation adapts to different screen sizes', async ({ page }) => {
		// Test tablet breakpoint
		await page.setViewportSize({ width: 768, height: 1024 });

		const navigation = page.locator('[data-testid="navigation"]');
		await expect(navigation).toBeVisible();

		// Check if menu behavior changes at tablet size
		const hamburgerButton = page.locator('[data-testid="nav-hamburger"]');
		const menuItems = page.locator('[data-testid="nav-menu-item"]');

		const hasHamburger = (await hamburgerButton.count()) > 0;
		const menuVisible = await menuItems.nth(0).isVisible();

		// Either hamburger exists OR menu items are visible
		expect(hasHamburger || menuVisible).toBeTruthy();
	});

	test('supports skip navigation for accessibility', async ({ page }) => {
		// Tab to first element (should be skip link)
		await page.keyboard.press('Tab');

		const skipLink = page.locator('[data-testid="skip-nav"]');
		if ((await skipLink.count()) > 0) {
			await expect(skipLink).toBeFocused();

			// Test skip functionality
			await page.keyboard.press('Enter');

			const mainContent = page.locator('[data-testid="main-content"]');
			await expect(mainContent).toBeFocused();
		}
	});
});
