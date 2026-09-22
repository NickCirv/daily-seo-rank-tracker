# daily-seo-rank-tracker — implementation reference

Source revision: `389d69a4fa96613853306540f10577f3050f64ce`. This reference records source declarations; it is not a transcript of a successful run.

## Entrypoint and runtime

[package.json](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/package.json) declares `src/index.js`. Node.js `>=20` and npm.

## Supported workflow

Keyword/domain/country inputs; saved history; movement thresholds; generated reports.

Search results vary by location, time and actor behavior. Apify calls can incur usage; this script does not schedule itself or guarantee live daily runs. No current SERP was fetched for this review.

## Command reference

The commands below use the installed executable name. From the pinned checkout, replace it with the `node` entrypoint shown above. Options and command branches were cross-checked against captured source; examples are not execution transcripts.

| Flag | Description |
|------|-------------|
| `--domain` | Domain to track (e.g. `example.com`) |
| `--keywords` | Comma-separated keyword list |
| `--country` | Google country code (default: `us`) |

## Package scripts

| Script | Exact command |
| --- | --- |
| `start` | `node src/index.js` |
| `track` | `node src/index.js` |
| `test` | `node --test` |

## Environment references

The implementation reads `APIFY_TOKEN`. Some are optional or mode-specific; inspect their call sites before configuring a service. Credentials and endpoint values are never supplied by this document.

## Implementation sources

[src/index.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/src/index.js).

## Verification boundary

No repository code, tests, network operation, hook installer or migration was executed for this review. Source inspection supports the documented interface; runtime correctness and external-service compatibility remain unverified.
