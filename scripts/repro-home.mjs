/* Homepage featured-grid lightbox: wait out the intro, then open/close. */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message.slice(0, 300)));

await page.goto("http://localhost:3000/home", { waitUntil: "networkidle" });

// Wait for the intro overlay to release the body scroll lock.
await page.waitForFunction(() => document.body.style.overflow !== "hidden", null, { timeout: 15000 });
console.log("intro finished, body overflow:", await page.evaluate(() => document.body.style.overflow || "(empty)"));

await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(1000);

const card = page.locator('div[aria-label^="See more about"]').first();
await card.click();
await page.waitForTimeout(1500);
console.log("modal open, dialogs:", await page.locator('[role="dialog"]').count());

await page.mouse.click(10, 400); // backdrop
await page.waitForTimeout(2000);

const diag = await page.evaluate(() => {
  const shield = [...document.querySelectorAll("div")].find((d) => {
    const s = getComputedStyle(d);
    const r = d.getBoundingClientRect();
    return s.position === "fixed" && r.width > 600 && r.height > 400 && s.pointerEvents !== "none" && Number(s.zIndex) >= 90;
  });
  return { bodyOverflow: document.body.style.overflow || "(empty)", shield: !!shield };
});
console.log("after close:", JSON.stringify(diag));

// Reopen + close via Escape, then click a nav tab.
await card.click();
await page.waitForTimeout(1200);
await page.keyboard.press("Escape");
await page.waitForTimeout(1200);
await page.click("nav >> text=Projects", { timeout: 4000 });
console.log("nav after close OK, url:", page.url());
await browser.close();
console.log("done");
