/**
 * Repro: does the Contact panel's wireframe ornament (canvas) change size /
 * overflow the blue panel when the form grows (validation errors / banner)?
 *
 * Usage: node scripts/repro-ornament-resize.mjs [url]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000/contact";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector(".mesh-accent canvas", { timeout: 10000 });
await page.waitForTimeout(800); // let entrance animations settle

async function measure(tag) {
  return page.evaluate((tag) => {
    const c = document.querySelector(".mesh-accent canvas");
    const panel = document.querySelector(".mesh-accent").getBoundingClientRect();
    const r = c.getBoundingClientRect();
    return {
      tag,
      canvas: { w: Math.round(r.width), h: Math.round(r.height) },
      panelH: Math.round(panel.height),
      insidePanel: r.left >= panel.left - 1 && r.right <= panel.right + 1,
    };
  }, tag);
}

const before = await measure("before-errors");
await page.click('button[type="submit"]'); // empty form → 3 validation errors
await page.waitForSelector('[role="alert"]');
await page.waitForTimeout(600); // let error height animation + resize settle
const after = await measure("after-errors");

console.log(JSON.stringify({ before, after }, null, 2));
// ≤2px drift allowed: the stage caps at a 216px square, and sub-pixel layout
// rounding can flip a boundary pixel when the panel height changes.
const stable =
  Math.abs(before.canvas.w - after.canvas.w) <= 2 &&
  Math.abs(before.canvas.h - after.canvas.h) <= 2 &&
  Math.abs(before.canvas.w - before.canvas.h) <= 1 && // square
  Math.abs(after.canvas.w - after.canvas.h) <= 1 && // still square
  before.insidePanel &&
  after.insidePanel;
console.log(stable ? "PASS: ornament size stable and inside panel" : "FAIL");
await browser.close();
process.exit(stable ? 0 : 1);
