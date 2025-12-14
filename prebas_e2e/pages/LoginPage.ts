// Para correr el archivo se ejecuta: npx cucumber-js

import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}
  
  async open() {
    await this.page.goto("https://www.imdb.com/es-es/", {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    const acceptButton = this.page.locator('button:has-text("Aceptar")');

    if (await acceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptButton.click();
    }
  }

  async typeMovie(movie: string) {
    const input = this.page.locator('input[name="q"]');
    await input.waitFor();
    await input.fill(movie);
  }

  async clickSearchButton() {
    const button = this.page.locator('button[type="submit"]');
    await button.click();
    await this.page.waitForURL("**/find**");
  }

  async selectMovieFromResults(movieTitle: string) {
    const movieLink = this.page
      .getByRole("link", { name: movieTitle, exact: true });

    await movieLink.waitFor({ timeout: 15000 });
    await movieLink.click();

    await this.page.waitForURL(/\/title\/tt\d+/, { timeout: 15000 });
  }

  async getTitle(): Promise<string | null> {
    const title = this.page.getByTestId("hero__primary-text");
    await title.waitFor({ timeout: 15000 });
    return title.textContent();
  }

  async getDirector(): Promise<string | null> {
    await this.page.waitForSelector('[data-testid="title-pc-principal-credit"]');
    return this.page.textContent('[data-testid="title-pc-principal-credit"]');
  }

  async getRating(): Promise<number> {
    await this.page.waitForSelector(
      '[data-testid="hero-rating-bar__aggregate-rating__score"] span'
    );

    const ratingText = await this.page.textContent(
      '[data-testid="hero-rating-bar__aggregate-rating__score"] span'
    );

    if (!ratingText) return 0;
    return Number(ratingText.replace(",", "."));
  }
}