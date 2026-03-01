const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  // Get URLs from command line
  const seedLinks = process.argv.slice(2);

  if (seedLinks.length === 0) {
    console.error("No URLs provided.");
    process.exit(1);
  }

  for (const link of seedLinks) {
    console.log(`Visiting: ${link}`);
    await page.goto(link, { waitUntil: "load" });

    const numbers = await page.$$eval("table td", cells =>
      cells.map(td => td.innerText)
    );

    numbers.forEach(val => {
      const num = parseFloat(val.replace(/[^0-9.-]/g, ""));
      if (!isNaN(num)) {
        grandTotal += num;
      }
    });
  }

  console.log("=================================");
  console.log("FINAL TOTAL SUM:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
  console.log("FINAL TOTAL SUM:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
