import { test } from "@playwright/test";

test("has world", async ({ page }) => {
  await page.goto("http://localhost:3000");
});
