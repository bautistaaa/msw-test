import { test, expect } from "@playwright/test";
import { data } from "../src/mocks/data";

test("has hello", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByText("Hello", { exact: true })).toBeVisible();
});

test("has world", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.waitForFunction(() => window.msw);

  await page.evaluate(() => {
    const { graphql, worker, http, HttpResponse } = window.msw;
    worker.use(
      http.get("/greeting", () => {
        return HttpResponse.json(data); // cannot import files
      })
      // graphql.query("someOperation", () => {
      //   return HttpResponse.json({ test: 1 });
      // })
    );
  });

  await expect(page.getByText("World", { exact: true })).toBeVisible();
});
