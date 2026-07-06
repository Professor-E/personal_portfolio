/* Repro matrix: try many open/close sequences and report any stuck overlay. */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

async function checkInteractive(label) {
  await page.waitForTimeout(1600);
  const diag = await page.evaluate(() => {
    const el = document.elementFromPoint(640, 400);
    const shield = [...document.querySelectorAll("div")].find((d) => {
      const s = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return (
        s.position === "fixed" &&
        r.width > 600 &&
        r.height > 400 &&
        s.pointerEvents !== "none" &&
        Number(s.zIndex) >= 90
      );
    });
    return {
      bodyOverflow: document.body.style.overflow || "(empty)",
      centerTag: el ? el.tagName + "." + String(el.className).slice(0, 60) : null,
      shield: shield
        ? {
            cls: String(shield.className).slice(0, 120),
            z: getComputedStyle(shield).zIndex,
            opacity: getComputedStyle(shield).opacity,
          }
        : null,
    };
  });
  const ok = !diag.shield && diag.bodyOverflow === "(empty)";
  console.log(`[${ok ? "OK  " : "STUCK"}] ${label}`, ok ? "" : JSON.stringify(diag));
  return ok;
}

async function fresh(path = "/projects") {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
}

const card = () => page.locator('article[role="button"]').first();

// 1. open → close via X
await fresh();
await card().click();
await page.waitForTimeout(1200);
await page.click('button[aria-label="Close"]');
await checkInteractive("close via X");

// 2. open → Escape
await card().click();
await page.waitForTimeout(1200);
await page.keyboard.press("Escape");
await checkInteractive("close via Escape");

// 3. open → arrow next twice → backdrop close (detached path)
await card().click();
await page.waitForTimeout(1200);
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(600);
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(600);
await page.mouse.click(10, 400);
await checkInteractive("navigate then backdrop close");

// 4. rapid open/close x3
for (let i = 0; i < 3; i++) {
  await card().click();
  await page.waitForTimeout(250);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
}
await checkInteractive("rapid open/close x3");

// 5. close then immediately reopen another card
await card().click();
await page.waitForTimeout(1000);
await page.keyboard.press("Escape");
await page.waitForTimeout(150);
await page.locator('article[role="button"]').nth(2).click({ force: true }).catch(() => console.log("  (reopen click failed)"));
await page.waitForTimeout(1200);
await page.keyboard.press("Escape");
await checkInteractive("close then instant reopen");

// 6. filter change with modal history + open/close
await fresh();
await page.click("text=Hardware");
await page.waitForTimeout(800);
await card().click();
await page.waitForTimeout(1000);
await page.mouse.click(10, 400);
await checkInteractive("filter then open/close");

// 7. extracurriculars page
await fresh("/extracurriculars");
await card().click().catch(async () => {
  await page.locator('[role="button"]').first().click();
});
await page.waitForTimeout(1200);
await page.mouse.click(10, 400);
await checkInteractive("extracurriculars open/close");

// 8. homepage featured grid
await fresh("/home");
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(800);
await page.locator('div[role="button"]').first().click();
await page.waitForTimeout(1200);
await page.mouse.click(10, 400);
await checkInteractive("homepage featured open/close");

// 9. nav to another tab right after close
await fresh("/projects");
await card().click();
await page.waitForTimeout(1000);
await page.keyboard.press("Escape");
await page.waitForTimeout(120);
try {
  await page.click("nav >> text=Hobbies", { timeout: 3000 });
  console.log("[OK  ] nav right after close, url:", page.url());
} catch (e) {
  console.log("[STUCK] nav right after close:", e.message.split("\n")[0]);
}

await browser.close();
console.log("done");
