import {Given, When, Then} from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(30 * 1000);

let loginPage: LoginPage;

Given ("I access the movie website", async function () {
    this.browser = await chromium.launch({headless: false})
    this.page = await this.browser.newPage();
    loginPage = new LoginPage(this.page);
    await loginPage.open();
});

When ("I search for {string} in the search engine", async function (movie: string) {
    await loginPage.typeMovie(movie);
});   

When("I click the search button", async function () {
    await loginPage.clickSearchButton();
});

When("I select the movie {string} from results", async function (movie: string) {
    await loginPage.selectMovieFromResults(movie);
});

Then ("I see the title {string}", async function (title: string) {
    const pageTitle = await loginPage.getTitle();
    expect(pageTitle).toContain(title);
});
        
Then ("the director {string} appears", async function (director: string) {
    const pageDirector = await loginPage.getDirector();
    expect(pageDirector).toContain(director);
});
        
Then ("the film has a rating higher than {float}", async function (rating: number) {
    const pageRating = await loginPage.getRating();
    expect(pageRating > rating);
});
        