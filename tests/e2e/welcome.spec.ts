/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

// @vitest-environment nuxt
import { test, expect } from '@playwright/test';

test('Page looks correct', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.screenshot();
});

test('Help pop up', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Help' }).click();
  await expect(page.getByRole('heading', { name: 'General Explanations' })).toBeVisible();
  await expect(
    page.getByText('CognitiveMapr is here to assist you in creating and comparing cognitive maps.'),
  ).toBeVisible();
  await expect(page.getByText('General', { exact: true })).toBeVisible();
  await expect(page.getByText('Home Page').nth(1)).toBeVisible();
  await expect(page.getByText('Upload Page', { exact: true })).toBeVisible();
  await expect(page.getByText('Graph Page', { exact: true })).toBeVisible();
  await expect(page.getByText('Export Pop-up', { exact: true })).toBeVisible();
  await expect(page.getByText('Contact')).toBeVisible();
  await expect(page.getByRole('button').nth(2)).toBeVisible();
  await page.getByText('Home Page').nth(1).click();
  await expect(page.getByRole('heading', { name: 'Home Page Explanations' })).toBeVisible();
  await expect(page.locator('img')).toBeVisible();
  await page.getByText('Upload Page').click();
  await expect(page.getByRole('heading', { name: 'Upload Page Explanations' })).toBeVisible();
  await expect(page.locator('img')).toBeVisible();
  await page.getByText('Graph Page').click();
  await expect(page.getByRole('heading', { name: 'Graph Page Explanations' })).toBeVisible();
  await expect(page.locator('img')).toBeVisible();
  await page.getByText('Export Pop-up').click();
  await expect(page.getByRole('heading', { name: 'Export Pop-up Explanations' })).toBeVisible();
  await expect(page.locator('img')).toBeVisible();
  await page.getByText('Contact').click();
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
  await expect(page.getByText('For further questions about')).toBeVisible();
  await expect(page.getByText('For any technical related')).toBeVisible();
  await page.getByRole('button').nth(2).click();
});

test('Settings & Dark mode toggle', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByText('Color', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Color Settings' })).toBeVisible();
  await expect(page.getByText('Dark Mode')).toBeVisible();
  await expect(page.locator('label span')).toBeVisible();
  await page.locator('label span').click();
  await expect(page.getByText('Color', { exact: true })).toHaveCSS(
    'background-color',
    'rgb(98, 128, 197)',
  );
});

test('Welcome screen', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'CognitiveMapr' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Help' })).toBeVisible();
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await expect(page.getByText('Welcome!')).toBeVisible();
  await expect(page.getByText('Get started now!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await page.locator('.start').click({ delay: 10 });
  await page.waitForURL('**/upload');
  expect(page.url()).toBe('http://localhost:3000/upload');
});
