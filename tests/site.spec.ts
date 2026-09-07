import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/content/projects";

const pages = ["/", "/projects", "/services", "/about-us", "/contact-us"];

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow, "document wider than the viewport").toBeLessThanOrEqual(1);
}

for (const path of pages) {
  test(`${path} renders, stays contained and passes axe`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    // Motion runs on a fixed compositor budget; freezing it keeps axe stable.
    await page.emulateMedia({ reducedMotion: "reduce" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });
}

test("every project has a detail route with its disclosure", async ({
  page,
}) => {
  for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status(), project.slug).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".visual-disclosure").first()).toBeVisible();
  }
});

test("unknown project slugs return 404", async ({ page }) => {
  const response = await page.goto("/projects/not-a-real-project");
  expect(response?.status()).toBe(404);
});

test("sitemap covers every route", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  for (const path of pages) expect(xml).toContain(`${path}</loc>`);
  for (const project of projects)
    expect(xml).toContain(`/projects/${project.slug}</loc>`);
});

test("gallery filters and search narrow the portfolio", async ({ page }) => {
  await page.goto("/projects");
  const count = page.locator(".gallery-count");
  await expect(count).toHaveText(`Showing all ${projects.length} projects`);

  const fintech = projects.filter((p) => p.sector === "Fintech").length;
  await page.getByRole("button", { name: /^Fintech/ }).click();
  await expect(count).toHaveText(
    `Showing ${fintech} of ${projects.length} projects`,
  );
  await expect(page.locator(".gallery-grid > div")).toHaveCount(fintech);

  await page.getByRole("searchbox").fill("zzzz-no-match");
  await expect(page.locator(".gallery-empty")).toBeVisible();
  await page.getByRole("button", { name: /Clear the filters/ }).click();
  await expect(count).toHaveText(`Showing all ${projects.length} projects`);
});

test("hero module tabs move with arrow keys", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(1)).toBeFocused();
  await page.keyboard.press("End");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("evidence story links and unlinks the artefacts", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator(
    "section[aria-labelledby=evidence-title] button[aria-pressed]",
  );
  await toggle.scrollIntoViewIfNeeded();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".evidence-result")).toContainText(
    "Timeline assembled",
  );
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
});

test("ambient motion toggle persists and pauses artwork", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator(".motion-toggle");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  const visuals = page.locator("[data-animated-visual]");
  await expect(visuals.first()).toHaveAttribute("data-motion", "off");
  await page.reload();
  await expect(page.locator(".motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.locator(".motion-toggle").click();
  await expect(page.locator(".motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("contact form builds a local draft without a network request", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto("/contact-us");
  await page.getByLabel(/^Name/).fill("Test Person");
  await page.getByLabel(/^Email/).fill("test@example.com");
  await page.getByLabel(/^Project/).fill("A short brief about a hard problem.");
  await page.getByRole("button", { name: /Prepare email/ }).click();
  const draft = page.locator(".sp-draft");
  await expect(draft).toBeVisible();
  await expect(draft).toBeFocused();
  await expect(draft.locator("pre")).toContainText("Name: Test Person");
  expect(posts).toEqual([]);
});

test("the site reads without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  // All chapters must be document content, not sticky-stage slides.
  await expect(page.locator(".story-chapter")).toHaveCount(3);
  await page.goto("/projects");
  await expect(page.locator(".work-grid a").first()).toBeVisible();
  await expect(page.locator(".gallery-controls")).toBeHidden();
  await page.goto("/contact-us");
  await expect(page.locator(".sp-noscript")).toBeVisible();
  await context.close();
});
