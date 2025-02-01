import { chromium } from "playwright";

(async () => {
  let browser = await chromium.launch();

  let page = await browser.newPage();
  await page.setViewportSize({ width: 1000, height: 400 });
  await page.goto(`file://${process.env.PWD}/src/fontGeneration/index.html`);
  await page.screenshot({ path: `openbsd-playwright-shot.png` });
  await browser.close();
})();
