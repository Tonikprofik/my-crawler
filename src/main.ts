// For more information, see https://crawlee.dev/
import { Dataset, PlaywrightCrawler, ProxyConfiguration } from "crawlee";
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

    const countPassed = await page.locator("div.past").count();
    log.info(`countPassed: ${countPassed} `);

    const countInfoEl = await page
      .locator(".day, .info-element >> visible = true")
      .count();
    // 15
    // >> visible = true, 7 
    log.info(`countInfoEl: ${countInfoEl} `);

    //all text
    let dataInfoElText: any = [];
    const alltext = async () => {
      // show if its not class past
      for (let i = 0; i < countInfoEl; ++i) {
        //if ( await page.locator(".day, .info-element >> visible = true").nth(i).)) {

          const text = await page
          .locator(".day, .info-element >> visible = true")
          .nth(i)
          .textContent();
          log.info(`text: ${text} `);
          // append to object dataInfoElText
          await dataInfoElText.push(text);
       // }
      }
    };
    await alltext();

    await page
      .locator(".day, .info-element >> visible = true")
      .filter({ hasText: "Klik for at se" })
      .first()
      .click();

    await alltext();

    // const infoEl = await page.locator(".day, .info-element");
    // // for each infoEl with .day, .info-element class get textContent
    // await infoEl.filter({ hasText: "Klik for at se" }).first().click();

    // const slotsofDay = await page.waitForSelector(".slots");
    // const locatSlotsOfDay = await page.locator(".slots").first();
    // const countSlotsOfDay = await locatSlotsOfDay.filter({ hasText: "Ledig" }).count();

    // log.info(`slots: ${slotsofDay} locatSlotsOfDay: ${locatSlotsOfDay} countSlotsOfDay: ${countSlotsOfDay} `);

    // const passedSlots = await page.locator(".passed").count();
    // const availableSlots = available - passedSlots;

    await Dataset.pushData({
      countInfoEl,
      dataInfoElText,
      url: request.loadedUrl,
    });
  },
  headless: true,

  maxRequestsPerCrawl: 20,
});

await crawler.run(startUrls);
