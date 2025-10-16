import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('should load the about page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/探索世界|travel-site/i)
    await expect(page).toHaveURL(/.*about/)
  })

  test('should display the hero section', async ({ page }) => {
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toBeVisible()
    await expect(heroHeading).toContainText('关于我们')
  })

  test('should display mission section', async ({ page }) => {
    const missionHeading = page.locator('h2').filter({ hasText: '我们的使命' })
    await expect(missionHeading).toBeVisible()
  })

  test('should display values section with cards', async ({ page }) => {
    const valuesHeading = page.locator('h2').filter({ hasText: '我们的价值观' })
    await expect(valuesHeading).toBeVisible()
    
    // Check for value cards - should have 4 values
    const valueCards = page.locator('.bg-white.rounded-xl').filter({ has: page.locator('h3') })
    await expect(valueCards).toHaveCount(4)
  })

  test('should display features section', async ({ page }) => {
    const featuresHeading = page.locator('h2').filter({ hasText: '为什么选择我们' })
    await expect(featuresHeading).toBeVisible()
    
    // Check for feature cards - should have 6 features
    const featureCards = page.locator('.card')
    const count = await featureCards.count()
    expect(count).toBeGreaterThanOrEqual(6)
  })

  test('should display stats section', async ({ page }) => {
    // Stats section should be visible
    const statsSection = page.locator('section.bg-gradient-to-r').filter({ hasText: '50,000+' })
    await expect(statsSection).toBeVisible()
    
    // Check for stats - should have satisfaction, destinations, rating, years
    await expect(page.getByText('50,000+')).toBeVisible()
    await expect(page.getByText('200+')).toBeVisible()
    await expect(page.getByText('4.8/5')).toBeVisible()
    await expect(page.getByText('10+')).toBeVisible()
  })

  test('should display team section', async ({ page }) => {
    const teamHeading = page.locator('h2').filter({ hasText: '我们的团队' })
    await expect(teamHeading).toBeVisible()
    
    // Should have 3 team members
    const teamCards = page.locator('.bg-white.rounded-xl.overflow-hidden')
    await expect(teamCards).toHaveCount(3)
  })

  test('should display CTA section with navigation links', async ({ page }) => {
    const ctaHeading = page.locator('h2').filter({ hasText: '准备开始您的旅程了吗' })
    await expect(ctaHeading).toBeVisible()
    
    // Check for CTA buttons
    const browseButton = page.locator('a').filter({ hasText: '浏览目的地' })
    await expect(browseButton).toBeVisible()
    
    const contactButton = page.locator('a').filter({ hasText: '联系我们' })
    await expect(contactButton).toBeVisible()
  })

  test('should navigate back to home when clicking browse destinations', async ({ page }) => {
    const browseButton = page.locator('a').filter({ hasText: '浏览目的地' }).first()
    await browseButton.click()
    
    await expect(page).toHaveURL('/')
  })

  test('should be accessible via header navigation', async ({ page }) => {
    // First go to home
    await page.goto('/')
    
    // Click on About link in header
    const aboutLink = page.locator('a, router-link').filter({ hasText: /^关于我们$/ }).first()
    await aboutLink.click()
    
    // Should navigate to about page
    await expect(page).toHaveURL(/.*about/)
    
    // Verify content loaded
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toContainText('关于我们')
  })

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Hero section should still be visible
    const heroHeading = page.locator('h1').first()
    await expect(heroHeading).toBeVisible()
    
    // Mission section should be visible
    const missionHeading = page.locator('h2').filter({ hasText: '我们的使命' })
    await expect(missionHeading).toBeVisible()
    
    // Values should stack vertically (grid should work)
    const valueCards = page.locator('.bg-white.rounded-xl').filter({ has: page.locator('h3') })
    await expect(valueCards.first()).toBeVisible()
  })

  test('should have working header and footer', async ({ page }) => {
    // Check header exists
    const header = page.locator('header')
    await expect(header).toBeVisible()
    
    // Check footer exists
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})
