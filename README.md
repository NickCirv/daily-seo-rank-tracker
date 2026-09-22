![Nicholas Ashkar — daily-seo-rank-tracker](assets/nicholas-ashkar/banner.png)

# daily-seo-rank-tracker

Uses an Apify search actor to record a domain's positions for selected keywords.



<a id="usage"></a>

<a id="multi-keyword-with-uk-locale"></a>

## What it does

- Keyword/domain/country inputs.
- Saved history.
- Movement thresholds.
- Generated reports.


<a id="install"></a>

## Quickstart

Prerequisites: Node.js `>=20` and npm. The checkout below pins the source used for this documentation.

```sh
git clone https://github.com/NickCirv/daily-seo-rank-tracker.git
cd daily-seo-rank-tracker
git checkout 389d69a4fa96613853306540f10577f3050f64ce
npm install
node src/index.js --domain example.com --keywords "example" --country us
```

**Expected behavior (illustrative, not captured):** With APIFY_TOKEN configured, records the observed rank and generates a report for the requested query.

Examples are source-inspected, **not runtime-tested**. See the research record for verification gaps.

## Boundaries and data

Search results vary by location, time and actor behavior. Apify calls can incur usage; this script does not schedule itself or guarantee live daily runs. No current SERP was fetched for this review.

## Development

The manifest defines `npm test` as:

```sh
node --test
```

The captured suite is a smoke check, not end-to-end behavior coverage. Examples include “entry is valid JavaScript”. Tests were not run for this documentation revision.

See [implementation and command reference](docs/REFERENCE.md) for the package scripts and inspected interfaces, and [research record](docs/RESEARCH.md) for the pinned source, document decisions and unresolved checks.

## License and contact

See [LICENSE](LICENSE) for the original terms and attribution. Legal text is unchanged.

[Nicholas Ashkar](https://nicholashkar.com/) · [Discuss a project](https://nicholashkar.com/#oxblood-contact)
