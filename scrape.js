const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  // 🔹 If seeds are clickable links on a page, set that page URL here:
  const mainPage = "https://sanand0.github.io/tdsdata/";

  await page.goto(mainPage, { waitUntil: "load" });

  // Find Seed 64–73 links
  const seedLinks = await page.$$eval("a", links =>
    links
      .filter(a => a.innerText.match(/Seed\s*(6[4-9]|7[0-3])/))
      .map(a => a.href)
  );

  console.log("Found seed links:", seedLinks);

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
