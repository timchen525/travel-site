import { test, expect } from '@playwright/test'

test.describe('Destination Detail Page', () => {
  test('should navigate from home to detail page when clicking destination card', async ({ page }) => {
    // Go to home page
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Check that we're on the home page
    await expect(page).toHaveURL('/')
    
    // Wait for destination cards to be visible
    await expect(page.locator('.card').first()).toBeVisible()
    
    // Click on the first destination card
    await page.locator('.card').first().click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Check that we navigated to the detail page
    await expect(page).toHaveURL(/\/detail\/\d+/)
    
    // Verify detail page elements are visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=目的地简介')).toBeVisible()
    await expect(page.locator('text=行程亮点')).toBeVisible()
    await expect(page.locator('button:has-text("立即预订")')).toBeVisible()
  })

  test('should display destination details correctly', async ({ page }) => {
    // Navigate directly to a detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Check header elements
    await expect(page.locator('h1')).toContainText('马尔代夫')
    await expect(page.locator('text=印度洋')).toBeVisible()
    
    // Check rating display
    await expect(page.locator('text=⭐')).toBeVisible()
    
    // Check price display
    await expect(page.locator('text=/¥\\d+/')).toBeVisible()
    
    // Check description section
    await expect(page.locator('text=目的地简介')).toBeVisible()
    
    // Check highlights section
    await expect(page.locator('text=行程亮点')).toBeVisible()
    
    // Check fees section
    await expect(page.locator('text=费用包含')).toBeVisible()
    await expect(page.locator('text=费用不含')).toBeVisible()
    
    // Check booking button
    const bookButton = page.locator('button:has-text("立即预订")')
    await expect(bookButton).toBeVisible()
    await expect(bookButton).toBeEnabled()
  })

  test('should navigate to booking page when clicking book button', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Click the booking button
    await page.locator('button:has-text("立即预订")').click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Check that we navigated to the booking page
    await expect(page).toHaveURL('/booking/1')
    
    // Verify booking page elements
    await expect(page.locator('text=预订信息')).toBeVisible()
  })

  test('should show related destinations', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Scroll to related destinations section
    await page.locator('text=相似推荐').scrollIntoViewIfNeeded()
    
    // Check that related destinations are visible
    await expect(page.locator('text=相似推荐')).toBeVisible()
    
    // Check that there are related destination cards
    const relatedCards = page.locator('.card')
    await expect(relatedCards).toHaveCount({ minimum: 1 })
  })

  test('should navigate to another detail page when clicking related destination', async ({ page }) => {
    // Navigate to first detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Scroll to related destinations
    await page.locator('text=相似推荐').scrollIntoViewIfNeeded()
    
    // Click on a related destination
    const relatedCard = page.locator('.card').first()
    await relatedCard.click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Check that we're on a different detail page
    await expect(page).toHaveURL(/\/detail\/\d+/)
    
    // Verify the page loaded correctly
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should navigate back from detail page', async ({ page }) => {
    // Go to home page first
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Click on first destination
    await page.locator('.card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Verify we're on detail page
    await expect(page).toHaveURL(/\/detail\/\d+/)
    
    // Click back button
    await page.locator('button:has-text("返回")').click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Verify we're back on home page
    await expect(page).toHaveURL('/')
  })

  test('should have responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Check that key elements are visible on mobile
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('button:has-text("立即预订")')).toBeVisible()
    await expect(page.locator('text=目的地简介')).toBeVisible()
  })

  test('should display tags correctly', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Check that tags are visible
    const tags = page.locator('span:has-text("海滨"), span:has-text("度假"), span:has-text("蜜月")')
    await expect(tags.first()).toBeVisible()
  })

  test('should show contact information', async ({ page }) => {
    // Navigate to detail page
    await page.goto('/detail/1')
    await page.waitForLoadState('networkidle')
    
    // Scroll to booking card if needed
    await page.locator('text=需要帮助').scrollIntoViewIfNeeded()
    
    // Check contact info is visible
    await expect(page.locator('text=需要帮助')).toBeVisible()
    await expect(page.locator('text=400-123-4567')).toBeVisible()
  })
})
