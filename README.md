# Price Comparison

A lightweight price-comparison tool that crawls product pages from multiple retailers, extracts price and basic product metadata, and reports differences so you can find the best deals. This repository is primarily implemented in JavaScript (Node.js) with a few helper scripts in Python.

What I did: I created a clear, practical README that explains what this project does, how to install and run it, configuration options, a basic usage example, development tips, and contributing guidelines. Next you can adapt the configuration examples to your retailers, add provider scrapers, or request specific features you'd like documented more deeply.

---

Table of contents
- [Features](#features)
- [Architecture & How it works](#architecture--how-it-works)
- [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Configuration](#configuration)
- [Usage examples](#usage-examples)
- [Adding a new retailer scraper](#adding-a-new-retailer-scraper)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

Features
- Crawl multiple retailer pages concurrently
- Normalize prices and currency detection
- Compare prices across providers and highlight best offers
- Pluggable scrapers — add support for new retailers by adding a small scraper module
- Optional Python utilities for data processing/exporting

Architecture & How it works
- Main orchestrator (JavaScript / Node.js) controls the crawl schedule and coordinates individual provider scrapers.
- Provider scrapers are small modules that know how to fetch a page (HTTP or headless browser) and parse the DOM for price and title.
- Normalizer converts raw extracted values into canonical types (numbers, currencies, timestamps).
- Results are aggregated and output to console, files (CSV/JSON), or hooks (webhook/email) if configured.

Requirements
- Node.js 16+ (recommended)
- npm or yarn
- Python 3.8+ for helper scripts
- headless Chromium if any scrapers use Puppeteer (install via apt / brew or let Puppeteer download it)

Quickstart

1. Clone the repo
   git clone https://github.com/Aditya0854/price-comparison.git
   cd price-comparison

2. Install dependencies
   npm install

3. Create configuration
   Copy the example configuration file or create a `.env` with the values you need (see [Configuration](#configuration)).

4. Run
   npm start
   or
   node src/server.js

Configuration
This project expects environment variables or a config file for runtime settings. You can use `.env` or a JSON config — adapt based on how the code is wired in your fork.

Common environment variables
- PROVIDERS — comma-separated list of provider module names to run (e.g. "amazon,flipkart,example")
- TARGETS_FILE — path to a JSON/CSV file listing product URLs to check
- OUTPUT_FORMAT — json | csv | console (default: console)
- POLL_INTERVAL — how often to re-check prices in seconds (default: 3600)
- USER_AGENT — custom user agent string for HTTP requests
- USE_HEADLESS — "true" or "false" to use Puppeteer where needed

Example .env
PROVIDERS=amazon,example
TARGETS_FILE=./data/targets.json
OUTPUT_FORMAT=json
POLL_INTERVAL=1800
USER_AGENT=price-comparison-bot/1.0
USE_HEADLESS=false

Targets file format (example JSON)
[
  {
    "id": "p-001",
    "label": "Sony WH-1000XM4",
    "urls": {
      "amazon": "https://www.amazon.com/dp/B0863TXGM3",
      "bestbuy": "https://www.bestbuy.com/site/xyz"
    }
  },
  {
    "id": "p-002",
    "label": "Apple AirPods Pro",
    "urls": {
      "apple": "https://www.apple.com/shop/product/XYZ",
      "amazon": "https://www.amazon.com/dp/B07ZPC9QD4"
    }
  }
]

Usage examples

- Single run, output to console:
  node src/index.js --targets ./data/targets.json

- Save results to a JSON file:
  node src/index.js --targets ./data/targets.json --output results.json

- Run in watch/poll mode:
  node src/index.js --targets ./data/targets.json --poll 600

- Run a specific provider scraper (useful for debugging):
  node src/scrapers/amazon.js --url "https://www.amazon.com/dp/B0863TXGM3"

Adding a new retailer scraper
1. Create a new file in src/scrapers/, e.g. src/scrapers/myshop.js.
2. Export a standard function with the signature:
   async function scrape(url, options) -> returns { price: number, currency: string, title: string, raw: object }
3. Add the provider name to your PROVIDERS config or include it in the targets file.
4. Write unit tests for parsing edge-cases (prices with commas, discounts, ranges).

Development
- Code style: prefer modern ES modules (or CommonJS if the project currently uses it). Keep scrapers small and focused.
- Debugging: Use verbose logs when scraping (HTTP status, final URL, selected selectors).
- If you use Puppeteer, manage browser instances centrally to avoid memory leaks.

Testing
- Unit tests should mock HTTP responses (use nock or msw) and test parsing logic.
- Integration tests can run against saved HTML snapshots.
- Example test command:
  npm test

CLI options
(Check src/cli.js or src/index.js for supported flags)
- --targets <path>
- --output <path|console>
- --poll <seconds>
- --provider <name>

Troubleshooting
- If pages fail to load, check USER_AGENT and rate-limiting. Some retailers block non-browser requests.
- If a parser stops working, the site's structure likely changed: open the live HTML and update the selector logic.
- For headless browser failures, ensure system dependencies for Chromium are installed on the host.

Contributing
Contributions are welcome! Please:
1. Open an issue describing what you'd like to add or fix.
2. Fork the repo and create a topic branch.
3. Add tests for new behaviour.
4. Send a pull request with a clear title and description.

Guidelines:
- Keep provider scrapers small and well-documented.
- Add tests for any parsing logic.
- Follow the existing code style and lint rules.

License
This project is provided under the MIT License. See the LICENSE file for full details.

Contact
Maintainer: Aditya0854
Repository: https://github.com/Aditya0854/price-comparison
