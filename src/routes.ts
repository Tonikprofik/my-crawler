import { Dataset, createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);
  await enqueueLinks({
    globs: ["https://bookingportal.com/wannasport-test-court"],
    label: "detail",
  });
});

router.addHandler("detail", async ({ request, page, log }) => {
  const available = await page.locator(".available").count();
  const passedSlots = await page.locator(".passed").count();
  const availableSlots = available - passedSlots;

  log.info(`${availableSlots}`, { url: request.loadedUrl });

  await Dataset.pushData({
    url: request.loadedUrl,
    availableSlots,
  });
});
