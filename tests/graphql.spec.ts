import { test } from "@playwright/test";
import { initialize } from "./setupServer";

test.beforeAll(() => {
  initialize();
});
test("has world", async ({ page }) => {
  await page.goto("http://localhost:3000");
});
