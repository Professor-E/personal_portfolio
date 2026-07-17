/**
 * Repro: does the off-white page background / content ever paint before the
 * dark intro splash on a cold-session load of /home?
 *
 * Records, at every animation frame for the first ~3s (rAF fires just before
 * paint, so entry N ≈ what frame N shows):
 *   - <html> classes (intro-pending / intro-playing)
 *   - whether #intro-splash is displayed
 *   - whether any real page content (navbar) is visible
 *
 * Usage: node scripts/repro-intro-flash.mjs [url] [--throttle]
 */
import { chromium } from "playwright";

const url = process.argv.find((a) => a.startsWith("http")) ?? "http://localhost:3000/home";
const throttle = process.argv.includes("--throttle");

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();

if (throttle) {
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.5 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
}

await page.addInitScript(() => {
  window.__frames = [];
  const record = () => {
    const d = document.documentElement;
    const splash = document.getElementById("intro-splash");
    const nav = document.querySelector("nav");
    window.__frames.push({
      t: Math.round(performance.now()),
      cls: d.className
        .split(/\s+/)
        .filter((c) => c.includes("intro") || c === "light" || c === "dark")
        .join(","),
      splash: splash ? getComputedStyle(splash).display : "none-in-dom",
      navInDom: !!nav,
      bodyBg: document.body ? getComputedStyle(document.body).backgroundColor : "no-body",
    });
    if (performance.now() < 3000) requestAnimationFrame(record);
  };
  requestAnimationFrame(record);
});

await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);
const frames = await page.evaluate(() => window.__frames);

// Print the first 15 frames + any frame where the splash is not covering
// while intro classes are absent (i.e. content would be visible).
console.log("first frames:");
for (const f of frames.slice(0, 15)) console.log(" ", JSON.stringify(f));
const bad = frames.filter(
  (f) => f.splash !== "block" && !f.cls.includes("intro-playing") && f.t < 2500
);
console.log(`\nframes with NO dark cover in first 2.5s: ${bad.length}`);
for (const f of bad.slice(0, 10)) console.log(" ", JSON.stringify(f));

await browser.close();
