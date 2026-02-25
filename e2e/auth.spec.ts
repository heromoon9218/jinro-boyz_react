import { test, expect } from "@playwright/test";

const mockUser = {
  id: 1,
  email: "test@example.com",
  username: "testuser",
  created_at: "2025-01-01T00:00:00.000Z",
};

const mockToken = "mock-jwt-token-for-e2e";

function setupApiMock(page: import("@playwright/test").Page) {
  page.route("**/api/v1/users/sign_in", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 200,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({ user: mockUser }),
      });
    } else {
      await route.continue();
    }
  });

  page.route("**/api/v1/users", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 201,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({ user: mockUser }),
      });
    } else {
      await route.continue();
    }
  });

  page.route("**/api/v1/users/me", async (route) => {
    if (route.request().method() === "GET") {
      const authHeader = route.request().headers()["authorization"];
      if (authHeader?.includes(mockToken)) {
        await route.fulfill({
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: mockUser }),
        });
      } else {
        await route.fulfill({ status: 401 });
      }
    } else {
      await route.continue();
    }
  });

  page.route("**/api/v1/users/sign_out", async (route) => {
    if (route.request().method() === "DELETE") {
      await route.fulfill({ status: 204 });
    } else {
      await route.continue();
    }
  });
}

test.beforeEach(async ({ page }) => {
  setupApiMock(page);
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("ログイン成功: フォーム送信後に / にリダイレクトし、ヘッダーにプロフィール・ログアウトが表示される", async ({
  page,
}) => {
  await page.goto("/login");

  await page.getByLabel("メールアドレス").fill("test@example.com");
  await page.getByLabel("パスワード").fill("password123");
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("link", { name: "プロフィール" })).toBeVisible();
  await expect(page.getByRole("link", { name: "ログアウト" })).toBeVisible();
});

test("新規登録成功: フォーム送信後に / にリダイレクトし、ヘッダーにプロフィールが表示される", async ({
  page,
}) => {
  await page.goto("/register");

  await page.getByLabel("ユーザー名").fill("newuser");
  await page.getByLabel("メールアドレス").fill("new@example.com");
  await page.getByLabel("パスワード").fill("password123");
  await page.getByLabel("パスワード（確認）").fill("password123");
  await page.getByRole("button", { name: "新規登録" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("link", { name: "プロフィール" })).toBeVisible();
  await expect(page.getByRole("link", { name: "ログアウト" })).toBeVisible();
});
