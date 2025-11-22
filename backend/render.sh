#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Node.js dependencies
npm install

# 2. Install Python dependencies (Playwright & TheFuzz)
pip3 install -r requirements.txt

# 3. Install Playwright Browsers (Chromium only to save space/time)
playwright install chromium

# 4. Install OS-level dependencies required by Playwright
playwright install-deps