#!/usr/bin/env node

const puppeteer = require("puppeteer");
const yargs = require("yargs");
const chalk = require("chalk");

async function googleSearch(query) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(query)}`
  );

  const results = await page.evaluate(() => {
    const searchResults = [];
    // Noted: possible to update this and add more selectors to get more results
    document.querySelectorAll(".tF2Cxc").forEach((result) => {
      const title = result.querySelector("h3").innerText;
      const url = result.querySelector("a").getAttribute("href");
      searchResults.push({ title, url });
    });
    return searchResults;
  });

  await browser.close();
  return results;
}

async function main() {
  const argv = yargs
    .usage("Usage: $0 [options]")
    .option("q", {
      alias: "query",
      describe: "Specify the search query",
      type: "string",
    })
    .option("a", {
      alias: "advanced",
      describe: "Display query help for advanced search options",
      type: "boolean",
    }).argv;

  const advancedQueries = {
    "inurl:": `Value is contained somewhere in the url. \n\tEx: $0 -q "preventing ransomware inurl:fbi"`,
    "site:":
      'Only search within this website’s given domain. \n\tEx: $0 -q "windows xp end of life site:microsoft.com"',
    "filetype:":
      'Search only for files, not webpages. \n\tEx: $0 -q "nasa moon landing filetype:JPG"',
    "allinurl:": "Search all of the following words in the url.",
    "intext:":
      'Search the body of the webpage for specific text. \n\tEx: $0 -q "patient record intext:"index of /htdocs""',
    "related:":
      "Find website results that are related to your search term. \n\tEx: $0 -q related:sans.org",
    "info:":
      "Find supplemental information Google may have on this page (useful for finding cached pages). \n\tEx: $0 -i",
    "link:":
      "Find other pages indexed by Google that reference this link. \n\tEx: $0 -q link:http://www.somecompany.com/supersecretfile.doc",
    '"quote"':
      'Find an exact phrase (though results may include related words). \n\tEx: $0 -q "Malware Hunting"',
    "+word":
      'Show results with this word exactly. Do not include similar words. \n\tEx: $0 -q "Malware +Hunter"',
    "word/query":
      'Do not include this word in search results or queries. \n\tEx: $0 -q "Advanced Malware Hunting beginner introduction site:microsoft.com"',
    '"word * word"':
      'Wildcard. Search for anything between these two words, but include both. \n\tEx: $0 -q "Next * Firewalls with *"',
    "OR (or |)":
      'Return results for either item. The pipe character can be used in place. \n\tEx: $0 -q "locky OR ransomware"',
    "AND (or &)":
      'Return results with both items. Ampersand character can be used in place. \n\tEx: $0 -q "cissp AND certification"',
  };

  if (argv.advanced) {
    console.log("Advanced Query Help:");
    for (const [query, description] of Object.entries(advancedQueries)) {
      console.log(`${chalk.green(query)} - ${description}`);
    }
    return;
  }

  if (argv.query) {
    try {
      const results = await googleSearch(argv.query);
      console.log("Search results:");
      results.forEach((result, index) => {
        console.log(
          `  ${index + 1}. ${chalk.green(result.title)} - ${result.url}`
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.log("gdork");
    // log the usage of the program
    console.log("Usage: gdork [options]");
    // log the options of the program
    console.log("Options:");
    // log the query option
    console.log("  -q, --query <string>  Specify the search query");
    // log the advanced option
    console.log(
      "  -a, --advanced        Display query help for advanced search options"
    );
  }
}

main();
