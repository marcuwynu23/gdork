<div align="center">

# gdork

[![GitHub license](https://img.shields.io/github/license/marcuwynu23/gdork)](https://github.com/marcuwynu23/gdork/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/marcuwynu23/gdork)](https://github.com/marcuwynu23/gdork/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/marcuwynu23/gdork)](https://github.com/marcuwynu23/gdork/issues)

</div>

**gdork** is a command-line tool for performing Google dork searches using Puppeteer, a headless browser.

## Installation

You can install gdork via npm:

```sh
npm install -g gdork
```

Usage
To perform a Google dork search, use the following command:

```sh
gdork -q "your search query"
```

### Advanced Querying

```sh
gdork -a
```	
gdork supports various advanced querying options:

- **inurl:**: Value is contained somewhere in the url.
  - Example: `gdork -q "preventing ransomware inurl:fbi"`
- **site:**: Only search within this website’s given domain.
  - Example: `gdork -q "windows xp end of life site:microsoft.com"`
- **filetype:**: Search only for files, not webpages.
  - Example: `gdork -q "nasa moon landing filetype:JPG"`
- **allinurl:**: Search all of the following words in the url.
- **intext:**: Search the body of the webpage for specific text.
  - Example: `gdork -q "patient record intext:"index of /htdocs""`
- **related:**: Find website results that are related to your search term.
  - Example: `gdork -q related:sans.org`
- **info:**: Find supplemental information Google may have on this page (useful for finding cached pages).
  - Example: `gdork -i`
- **link:**: Find other pages indexed by Google that reference this link.
  - Example: `gdork -q link:http://www.somecompany.com/supersecretfile.doc`
- **"quote"**: Find an exact phrase (though results may include related words).
  - Example: `gdork -q "Malware Hunting"`
- **+word**: Show results with this word exactly. Do not include similar words.
  - Example: `gdork -q "Malware +Hunter"`
- **word/query**: Do not include this word in search results or queries.
  - Example: `gdork -q "Advanced Malware Hunting beginner introduction site:microsoft.com"`
- **"word \_ word"**: Wildcard. Search for anything between these two words, but include both.
  - Example: `gdork -q "Next \_ Firewalls with \*"`
- **OR (or |)**: Return results for either item. The pipe character can be used in place.
  - Example: `gdork -q "locky OR ransomware"`
- **AND (or &)**: Return results with both items. Ampersand character can be used in place.
  - Example: `gdork -q "cissp AND certification"`

based on cheatsheet: https://cdn-cybersecurity.att.com/blog-content/GoogleHackingCheatSheet.pdf

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or new features to add, feel free to contribute to this repository.

## License

N/A

Happy dorking!
