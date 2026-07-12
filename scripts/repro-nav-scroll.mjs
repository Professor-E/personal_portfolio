/**
 * Repro: route-change scroll reset + fade transition + display typography.
 *
 * Verifies, headlessly (rAF fires normally, unlike a backgrounded tab):
 *   1. After scrolling deep into a page, clicking a navbar tab lands the new
 *      page at scrollY 0 immediately AND stays there (Lenis used to lerp back
 *      toward the old position after Next's reset).
 *   2. The curtain-wipe element (fixed z-[80] surface panel) no longer exists —
 *      route transitions are a plain content fade.
 *   3. Headings + nav wordmark render in the display face (Manrope).
 *
 * Usage: node scripts/repro-nav-scroll.mjs [baseURL] [screenshotDir]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const shotDir = process.argv[3] ?? null;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => sessionStorage.setItem("intro_played", "true"));

const results = {};

async function navClick(label) {
  await page.locator("nav").getByRole("link", { name: label }).click();
}

// ── 1. Scroll deep into /projects, then navigate to About ───────────────────
await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.mouse.move(720, 450);
await page.mouse.wheel(0, 3000);
await page.waitForTimeout(1500); // let Lenis lerp settle
results.scrolledY = await page.evaluate(() => Math.round(window.scrollY));

await navClick("About Me");
await page.waitForURL("**/about", { timeout: 15000 });
await page.waitForTimeout(250);
results.aboutYImmediate = await page.evaluate(() => Math.round(window.scrollY));
await page.waitForTimeout(1000);
results.aboutYSettled = await page.evaluate(() => Math.round(window.scrollY));

// ── 2. And again in the other direction (About → Projects) ──────────────────
await page.mouse.wheel(0, 3000);
await page.waitForTimeout(1500);
results.scrolledY2 = await page.evaluate(() => Math.round(window.scrollY));

await navClick("Projects");
await page.waitForURL("**/projects", { timeout: 15000 });
await page.waitForTimeout(250);
results.projectsYImmediate = await page.evaluate(() => Math.round(window.scrollY));
await page.waitForTimeout(1000);
results.projectsYSettled = await page.evaluate(() => Math.round(window.scrollY));

// ── 3. No curtain element; template wrapper reaches full opacity ────────────
results.curtainCount = await page.evaluate(
  () => document.querySelectorAll('[class*="z-\\[80\\]"]').length
);

// ── 4. Display typography ────────────────────────────────────────────────────
results.h1Font = await page.evaluate(() =>
  getComputedStyle(document.querySelector("h1")).fontFamily.split(",")[0].trim()
);
results.logoFont = await page.evaluate(() =>
  getComputedStyle(document.getElementById("nav-logo-name")).fontFamily.split(",")[0].trim()
);
results.bodyFont = await page.evaluate(() =>
  getComputedStyle(document.body).fontFamily.split(",")[0].trim()
);

// ── Screenshots (optional) ───────────────────────────────────────────────────
if (shotDir) {
  await page.screenshot({ path: `${shotDir}/projects-top.png` });
  await page.goto(`${base}/home`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${shotDir}/home-hero.png` });
  await page.evaluate(() => localStorage.setItem("theme", "dark"));
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${shotDir}/home-hero-dark.png` });
  await page.evaluate(() => localStorage.setItem("theme", "light"));
  await page.goto(`${base}/about`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${shotDir}/about-top.png` });
}

console.log(JSON.stringify(results, null, 2));

// next/font rewrites family names to e.g. "__Manrope_dd5b2f" — normalize
// separators before matching.
const displayFace = (f) =>
  f.replace(/['"]/g, "").replace(/_/g, " ").includes("Manrope");
const pass =
  results.scrolledY > 500 &&
  results.aboutYImmediate <= 2 &&
  results.aboutYSettled <= 2 &&
  results.scrolledY2 > 500 &&
  results.projectsYImmediate <= 2 &&
  results.projectsYSettled <= 2 &&
  results.curtainCount === 0 &&
  displayFace(results.h1Font) &&
  displayFace(results.logoFont) &&
  !displayFace(results.bodyFont);

console.log(pass ? "PASS" : "FAIL");
await browser.close();
process.exit(pass ? 0 : 1);
