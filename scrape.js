const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const label = process.argv[2]; // e.g., "PROBLEM_1"
  const seedLinks = process.argv.slice(3);

  let grandTotal = 0;

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
  console.log(`${label} TOTAL: ${grandTotal}`);
  console.log("=================================");

  await browser.close();
})();
})();
