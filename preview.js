const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const filePath = 'file:///' + path.resolve(__dirname, 'minas-historica-vesperata.html').replace(/\\/g, '/');

  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'screenshots/01-hero.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-ves').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/02-vesperata.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-data').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/03-data.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-rot').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/04-roteiro.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-gp').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/05-grupo.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-ex').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/06-exclusividades.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-social').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/07-prova-social.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-faq').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/08-faq.png', fullPage: false });

  await page.evaluate(() => document.querySelector('#s-form').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/09-formulario.png', fullPage: false });

  // Full page desktop
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/00-full-desktop.png', fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/mobile-hero.png', fullPage: false });
  await page.screenshot({ path: 'screenshots/mobile-full.png', fullPage: true });

  await browser.close();
  console.log('Screenshots gerados com sucesso em /screenshots/');
})();
