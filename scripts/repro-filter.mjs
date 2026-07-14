/**
 * Repro: Projects page filter pills — verifies that switching filters
 * unmounts the filtered-out cards (with their pop/exit animation) and that
 * the "Function components cannot be given refs" warning is gone
 * (ProjectCard forwards its ref to motion.article for popLayout).
 *
 * Usage: node scripts/repro-filter.mjs [baseURL]
 *   baseURL defaults to http://localhost:3000
 *
 * Must run against a VISIBLE-equivalent context — headless Chromium fires
 * requestAnimationFrame normally, unlike a backgrounded browser tab where
 * every Framer Motion animation freezes mid-flight.
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const warnings = [];
page.on("console", (msg) => {
  if (msg.text().includes("Function components cannot be given refs")) {
    warnings.push(msg.text().slice(0, 120));
  }
});

// Skip the intro so the page is interactive immediately.
await page.addInitScript(() => sessionStorage.setItem("intro_played", "true"));
await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500); // entrance animations settle

const total = await page.locator("article").count();

// Switch to Software and give exits ample time to complete.
await page.getByRole("tab", { name: "Software" }).click();
await page.waitForTimeout(1500);

const afterSoftware = await page.locator("article").count();
const visibleCats = await page
  .locator("article span")
  .allTextContents()
  .then((t) => [...new Set(t.filter((x) => ["Hardware", "Software", "Research"].includes(x.trim())))]);

// And back to All — cards should return.
await page.getByRole("tab", { name: "All" }).click();
await page.waitForTimeout(1500);
const afterAll = await page.locator("article").count();

console.log(JSON.stringify({ total, afterSoftware, visibleCats, afterAll, refWarnings: warnings.length }, null, 2));

const pass =
  afterSoftware < total && // filtered-out cards actually unmounted
  visibleCats.every((c) => c === "Software") &&
  afterAll === total &&
  warnings.length === 0;

console.log(pass ? "PASS" : "FAIL");
await browser.close();
process.exit(pass ? 0 : 1);
