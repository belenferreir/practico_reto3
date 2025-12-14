import { After } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { CustomWorld } from "./world";

After(async function (this: CustomWorld, scenario) {
  const dir = "screenshots";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const status = scenario.result?.status;
  const name = scenario.pickle.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase();

  if (this.page) {
    const screenshot = await this.page.screenshot({
      path: path.join(dir, `${name}_${status}.png`),
      fullPage: true,
    });

    await this.attach(screenshot, "image/png");
  }

  if (this.browser) {
    await this.browser.close();
  }
});
