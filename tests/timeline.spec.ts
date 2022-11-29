const { test, expect } = require('@playwright/test');

test('Check timeline background color after scroll', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const circle1Before = await page.locator('id=circle1')
  const circle1BeforeColor = await circle1Before.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })

  await expect(circle1Before).toHaveCount(1)
  expect(circle1BeforeColor).toBe('rgb(229, 229, 229)')

  // Timeline
  const timeline1Before = await page.locator('id=timeline1')
  const timeline1BeforeColor = await timeline1Before.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })

  await expect(timeline1Before).toHaveCount(1)
  expect(timeline1BeforeColor).toBe('rgb(229, 229, 229)')


  await expect(page.locator("text='Step one'")).toHaveCount(0)
  await expect(page.locator("text='Step two'")).toHaveCount(0)
  await expect(page.locator("text='Finish'")).toHaveCount(0)

  // Scroll
  await page.mouse.wheel(0, -100)
  await page.waitForTimeout(100);
  await page.mouse.wheel(0, 1100)
  await page.waitForTimeout(100);

  const circle1 = await page.locator('id=circle3')
  const circle1Color = await circle1.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const circle2 = await page.locator('id=circle3')
  const circle2Color = await circle2.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const circle3 = await page.locator('id=circle3')
  const circle3Color = await circle3.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })

  await expect(circle1).toHaveCount(1)
  await expect(circle1Color).toBe('rgb(0, 0, 0)')

  await expect(circle2).toHaveCount(1)
  await expect(circle2Color).toBe('rgb(0, 0, 0)')

  await expect(circle3).toHaveCount(1)
  await expect(circle3Color).toBe('rgb(0, 0, 0)')


  // Timeline after scroll

  const timeline1 = await page.locator('id=timeline1')
  const timeline1Color = await circle1.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const timeline2 = await page.locator('id=timeline2')
  const timeline2Color = await timeline2.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })
  const timeline3 = await page.locator('id=timeline3')
  const timeline3Color = await timeline3.evaluate((e) => {
    return window.getComputedStyle(e).getPropertyValue("background-color")
  })

  await expect(timeline1).toHaveCount(1)
  expect(timeline1Color).toBe('rgb(0, 0, 0)')

  await expect(timeline2).toHaveCount(1)
  expect(timeline2Color).toBe('rgb(0, 0, 0)')

  await expect(timeline3).toHaveCount(1)
  expect(timeline3Color).toBe('rgb(0, 0, 0)')


  await expect(page.locator("text='Step one'")).toHaveCount(1)
  await expect(page.locator("text='Step two'")).toHaveCount(1)
  await expect(page.locator("text='Finish'")).toHaveCount(1)

  // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*reactjs/);
});

// test('Check timeline callbacks', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   await expect(page.locator("text='Step one'")).toHaveCount(0)
//   await expect(page.locator("text='Step two'")).toHaveCount(0)
//   await expect(page.locator("text='Finish'")).toHaveCount(0)

//   // Scroll
//   await page.mouse.wheel(0, -100)
//   await page.mouse.wheel(0, 1100)
//   await page.waitForTimeout(500);

//   await expect(page.locator("text='Step one'")).toHaveCount(1)
//   await expect(page.locator("text='Step two'")).toHaveCount(1)
//   await expect(page.locator("text='Finish'")).toHaveCount(1)
// })