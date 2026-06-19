<div align="center">

# daily-seo-rank-tracker

**Track Google keyword rankings daily, detect position changes, and save Markdown + CSV reports.**

[![License: MIT](https://img.shields.io/badge/License-MIT-0B0A09?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-0B0A09?style=flat-square&logo=node.js)](https://nodejs.org)

</div>

## Install

```bash
git clone https://github.com/NickCirv/daily-seo-rank-tracker.git
cd daily-seo-rank-tracker
npm install
```

Requires an [Apify](https://apify.com) API token:

```bash
export APIFY_TOKEN=your_token_here
```

## Usage

```bash
node src/index.js --domain example.com --keywords "seo audit tool,rank tracker" --country us
```

```bash
# Multi-keyword with UK locale
node src/index.js --domain mysite.co.uk --keywords "wordpress plugin,schema markup,seo checker" --country gb
```

| Flag | Description |
|------|-------------|
| `--domain` | Domain to track (e.g. `example.com`) |
| `--keywords` | Comma-separated keyword list |
| `--country` | Google country code (default: `us`) |

## What it does

Calls the Apify Google Search Scraper for each keyword and finds your domain's position in the top 100 organic results. On each run it compares against the previous day's data and flags any keyword that moved 3 or more positions. Results are saved to `reports/<domain>-<date>.md` and `reports/<domain>-<date>.csv`, with history stored in `data/<domain>_history.json` (90-day rolling window).

Run it daily via cron or a scheduler (e.g. `render.yaml` is included for Render deploys).

---
<sub>Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
