// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";

const startUrls = ["https://bookingportal.com/wannasport-test-court"];

const crawler = new PlaywrightCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: async ({ request, page, log }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    // desktop .available
    // await page.waitForSelector(".available");
    // const available = await page.locator(".available").count();
    // log.info(`available: ${available}`);

    await page.waitForSelector(
      "#main > div > div > div > div.main-area.col-md-9 > div.subview-host > div > div.resource-booking-info > div > div > div.grid-container > div > div > div > div:nth-child(3) > div"
    );
    const infoEl = await page
      .locator(
        "#main > div > div > div > div.main-area.col-md-9 > div.subview-host > div > div.resource-booking-info > div > div > div.grid-container > div > div > div > div:nth-child(3) > div"
      )
      .count();
    log.info(`infoEl: ${infoEl}`);

    const mobileInfoEl = await page.locator(".mobile > .info-element").count();
    log.info(`mobileInfoEl: ${mobileInfoEl}`);

    // const passedSlots = await page.locator(".passed").count();
    // const availableSlots = available - passedSlots;
    log.info(
      //   `availble ${available} - passedSlots ${passedSlots}= availableSlots ${availableSlots}`
      ``
    );
  },
  headless: true,
  maxRequestsPerCrawl: 20,
});

await crawler.run(startUrls);
