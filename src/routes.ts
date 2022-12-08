import { Dataset, createPlaywrightRouter, Configuration } from "crawlee";

export const router = createPlaywrightRouter();

// const config = Configuration.getGlobalConfig();
// config.set("headless", false);

router.addDefaultHandler(async ({ log }) => {
  log.info(`enqueueing new URLs`);
  //   await enqueueLinks({
  //     globs: ["https://bookingportal.com/wannasport-test-court/"],
  //     label: "detail",
  //   });
});

router.addHandler("detail", async ({ request, page, log }) => {
  log.info(`available`);
  const available = await page.locator(".available").count();
  log.info(`available: ${available}`);
  const passedSlots = await page.locator(".passed").count();
  const availableSlots = available - passedSlots;

  log.info(`${availableSlots}`, { url: request.loadedUrl });

  await Dataset.pushData({
    url: request.loadedUrl,
    availableSlots,
  });
});
