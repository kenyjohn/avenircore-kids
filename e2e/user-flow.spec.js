import { test, expect } from '@playwright/test';

test.describe('AvenirCore E2E User Flows', () => {
  test('homepage loads and displays correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AvenirCore/);
  });

  test('free workbook CTA provides direct download', async ({ page }) => {
    await page.goto('/');
    
    // Find the Download Free PDF button
    const downloadButton = page.locator('a:has-text("Download Free PDF")');
    await expect(downloadButton).toBeVisible();
    
    // Verify it points to the correct PDF and has the download attribute
    await expect(downloadButton).toHaveAttribute('href', '/avenircore-kids-ai-workbook.pdf');
    await expect(downloadButton).toHaveAttribute('download', '');
  });
  
  test('navigating to premium catalogue', async ({ page }) => {
    await page.goto('/');
    
    // Click the Explore Full Catalogue link
    const exploreLink = page.locator('a:has-text("Explore Full Catalogue")');
    await expect(exploreLink).toBeVisible();
    await exploreLink.click();
    
    // Ensure we are on the workbook page
    await expect(page).toHaveURL(/\/workbook/);
    await expect(page.locator('h1')).toContainText('The AI literacy toolkit');
  });
});
