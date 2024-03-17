/*
*  This program has been developed by students from the bachelor's Computer Science program at Utrecht University within the Software Project course.
* It is distributed under the GPL 3.0 open source license.
*/

// @vitest-environment nuxt
import { readFileSync } from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const __dirname = path.resolve();

const nodeFile = readFileSync(path.join(__dirname, 'tests/e2e/testAssets/node.csv'));
const edgeFile = readFileSync(path.join(__dirname, 'tests/e2e/testAssets/edge.csv'));

test('Edge File', async ({ page }) => {
  await page.goto('/upload');
  const fileSelectorArr = page.locator('.file-selector');
  const fileSelectorEdge = fileSelectorArr.first();
  // const fileSelectorNode = fileSelectorArr.nth(1);

  expect(fileSelectorEdge).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorEdge.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'edge.csv',
      mimeType: 'text/csv',
      buffer: edgeFile,
    },
  ]);

  page = fileChooser.page();
  expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();
});

test('Node File', async ({ page }) => {
  await page.goto('/upload');
  const fileSelectorArr = page.locator('.file-selector');
  // const fileSelectorEdge = fileSelectorArr.first();
  const fileSelectorNode = fileSelectorArr.nth(1);

  expect(fileSelectorNode).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorNode.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'node.csv',
      mimeType: 'text/csv',
      buffer: nodeFile,
    },
  ]);

  page = fileChooser.page();
  expect(
    page
      .locator('div')
      .filter({ hasText: /^node\.csv$/ })
      .first(),
  ).toBeVisible();
});

test('Edge & Node File', async ({ page }) => {
  await page.goto('/upload');
  const fileSelectorArr = page.locator('.file-selector');
  const fileSelectorEdge = fileSelectorArr.first();
  const fileSelectorNode = fileSelectorArr.nth(1);

  expect(fileSelectorEdge).toBeTruthy();
  const fileChooserPromiseEdge = page.waitForEvent('filechooser');
  await fileSelectorEdge.click();
  const fileChooserEdge = await fileChooserPromiseEdge;
  expect(fileChooserEdge.isMultiple()).toStrictEqual(true);
  await fileChooserEdge.setFiles([
    {
      name: 'edge.csv',
      mimeType: 'text/csv',
      buffer: edgeFile,
    },
  ]);
  expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();

  expect(fileSelectorNode).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorNode.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'node.csv',
      mimeType: 'text/csv',
      buffer: nodeFile,
    },
  ]);
  expect(
    page
      .locator('div')
      .filter({ hasText: /^node\.csv$/ })
      .first(),
  ).toBeVisible();
});

test('Graph name changes', async ({ page }) => {
  await page.goto('/upload');
  const fileSelectorArr = page.locator('.file-selector');
  const fileSelectorEdge = fileSelectorArr.first();

  expect(fileSelectorEdge).toBeTruthy();
  const fileChooserPromiseEdge = page.waitForEvent('filechooser');
  await fileSelectorEdge.click();
  const fileChooserEdge = await fileChooserPromiseEdge;
  expect(fileChooserEdge.isMultiple()).toStrictEqual(true);
  await fileChooserEdge.setFiles([
    {
      name: 'edge.csv',
      mimeType: 'text/csv',
      buffer: edgeFile,
    },
  ]);
  expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();

  const graphnameInput = page.locator('input[type="text"]');
  await graphnameInput.fill('Graph with stuff!');
  await graphnameInput.press('Enter');
  expect(await graphnameInput.inputValue()).toBe('Graph with stuff!');
});

test('Test if page is complete', async ({ page }) => {
  await page.goto('http://localhost:3000/upload');
  await expect(page.getByRole('heading', { name: 'Upload Page' })).toBeVisible();
  await expect(page.getByText("Below you'll find the upload")).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Graphs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Edge files' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Node files' })).toBeVisible();
  await expect(page.getByText('Drag file here to add new row').first()).toBeVisible();
  await expect(page.getByText('Drag file here to add new row').nth(1)).toBeVisible();
  await expect(page.getByRole('textbox').first()).toBeVisible();
  await expect(page.getByRole('textbox').nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear Table' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
});

test('Edge file only upload, requests values, show notification, continues', async ({ page }) => {
  await page.goto('http://localhost:3000/upload');

  const fileSelectorArr = page.locator('.file-selector');
  const fileSelectorEdge = fileSelectorArr.first();

  expect(fileSelectorEdge).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorEdge.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'edge.csv',
      mimeType: 'text/csv',
      buffer: edgeFile,
    },
  ]);

  page = fileChooser.page();
  expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();

  await expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csvDrag file here to add new rowDrag file here to add new row$/ })
      .getByRole('button')
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csvDrag file here to add new rowDrag file here to add new row$/ })
      .getByRole('button')
      .nth(1),
  ).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .click();
  await expect(page.getByText('Warning', { exact: true })).toBeVisible();
  await expect(page.getByText('Not all graphs are complete')).toBeVisible();
  await expect(page.getByText('The following graphs are')).toBeVisible();
  await expect(page.getByText('Graph 1')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back' }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' }).nth(1)).toBeVisible();
  await expect(page.getByText('You are able to continue')).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .nth(1)
    .click();
  await expect(page.getByRole('status').locator('div').nth(1)).toBeVisible();
  await expect(page.getByText('Graph builder - Node generator')).toBeVisible();
  await expect(page.getByText('99 node(s) were generated')).toBeVisible();
  await expect(page.getByLabel('Close')).toBeVisible();
  await expect(page.getByText('Choose Evaluation Values')).toBeVisible();
  await expect(
    page.getByText("The 'Evaluate Concepts' script has encountered a cycle in"),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Use selected values' })).toBeVisible();
  await expect(page.getByRole('button', { name: "Don't run scripts" })).toBeVisible();
  await expect(page.getByRole('button', { name: "Don't run scripts" })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Stability of single currency' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'solidarity' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Fiscal support package' })).toBeVisible();
  await expect(page.locator('.selected').first()).toBeVisible();
  await expect(page.locator('td:nth-child(3)').first()).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Use selected values$/ })
    .click();
  await page.waitForURL('**/graph?**');
  expect(page.url()).toContain('http://localhost:3000/graph');
});

test('Edge and nodelist upload and continue', async ({ page }) => {
  await page.goto('http://localhost:3000/upload');

  const fileSelectorArr = page.locator('.file-selector');
  const fileSelectorEdge = fileSelectorArr.first();
  const fileSelectorNode = fileSelectorArr.nth(1);

  expect(fileSelectorEdge).toBeTruthy();
  const fileChooserPromiseEdge = page.waitForEvent('filechooser');
  await fileSelectorEdge.click();
  const fileChooserEdge = await fileChooserPromiseEdge;
  expect(fileChooserEdge.isMultiple()).toStrictEqual(true);
  await fileChooserEdge.setFiles([
    {
      name: 'edge.csv',
      mimeType: 'text/csv',
      buffer: edgeFile,
    },
  ]);
  expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();

  expect(fileSelectorNode).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorNode.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'node.csv',
      mimeType: 'text/csv',
      buffer: nodeFile,
    },
  ]);
  expect(
    page
      .locator('div')
      .filter({ hasText: /^node\.csv$/ })
      .first(),
  ).toBeVisible();

  await expect(
    page
      .locator('div')
      .filter({ hasText: /^node\.csv$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^edge\.csv$/ })
      .first(),
  ).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .click();
  await expect(page.getByText('Graph builder')).toBeVisible();
  await expect(page.getByText('Graph successfully build!')).toBeVisible();
  await expect(page.getByRole('status').locator('div').nth(1)).toBeVisible();
  await page.waitForURL('**/graph?**');
  expect(page.url()).toContain('/graph');
});

test('Node list only is not allowed', async ({ page }) => {
  await page.goto('http://localhost:3000/upload');

  const fileSelectorArr = page.locator('.file-selector');
  // const fileSelectorEdge = fileSelectorArr.first();
  const fileSelectorNode = fileSelectorArr.nth(1);

  expect(fileSelectorNode).toBeTruthy();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileSelectorNode.click();
  const fileChooser = await fileChooserPromise;
  expect(fileChooser.isMultiple()).toStrictEqual(true);
  await fileChooser.setFiles([
    {
      name: 'node.csv',
      mimeType: 'text/csv',
      buffer: nodeFile,
    },
  ]);

  page = fileChooser.page();
  expect(
    page
      .locator('div')
      .filter({ hasText: /^node\.csv$/ })
      .first(),
  ).toBeVisible();

  await expect(page.getByText('node.csv')).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Next$/ })
    .click();
  await expect(page.getByText('Warning')).toBeVisible();
  await expect(page.getByText('Not all graphs are complete')).toBeVisible();
  await expect(page.getByText('Please ensure that all graphs')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' }).nth(1)).toBeVisible();
  await expect(page.locator('.btn-wrapper', { hasText: 'Next' }).nth(1)).toHaveClass(
    'btn-wrapper disabled',
  );
  await expect(page.getByRole('button', { name: 'Back' }).nth(1)).toBeVisible();
});
