# daily-seo-rank-tracker — documentation research

Reviewed 21 September 2026. Public GitHub source only.

## Revision and scope

- Commit: [`389d69a4fa96613853306540f10577f3050f64ce`](https://github.com/NickCirv/daily-seo-rank-tracker/commit/389d69a4fa96613853306540f10577f3050f64ce).
- Tree: `95b1cd4262f48a0b6bf6e2c1868f03f0cecada2e`; truncated: `false`.
- Capture: 7 of 7 eligible text files; all eligible text files.
- Method: package and entrypoint inspection, implementation-interface review, targeted behavior/limitation inspection, and test-source review. This is not an exhaustive correctness or security audit.
- Commands run against repository code: **none**. External services, deployment and npm publication were not verified.

## Claim and evidence map

| Documentation claim | Pinned evidence | Assessment |
| --- | --- | --- |
| Runtime, executable and development commands | [package.json](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/package.json) | Source declaration inspected; runtime unverified |
| Uses an Apify search actor to record a domain's positions for selected keywords. | [src/index.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/src/index.js) | Implementation interfaces inspected; behavior not executed |
| Keyword/domain/country inputs; saved history; movement thresholds; generated reports. | [src/index.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/src/index.js) | Source-backed scope, not a test result |
| Search results vary by location, time and actor behavior. Apify calls can incur usage; this script does not schedule itself or guarantee live daily runs. No current SERP was fetched for this review. | [src/index.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/src/index.js) | Material limits documented; service compatibility remains open |
| Existing checks | [test/smoke.test.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/test/smoke.test.js) | Test source read; no passing-run claim |

## Documentation inventory and disposition

| Existing document | Decision |
| --- | --- |
| [README.md](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/README.md) | Rewritten with source-specific purpose, direct checkout setup, limitations and verification status. Old section fragments retained where practical. |

Added `docs/REFERENCE.md` for the observed implementation and command surface, and this research record. Protected license and attribution files remain in their original locations without edits. No source or product UI was changed.

## Quality dimensions

| Dimension | Status | Evidence / next step |
| --- | --- | --- |
| Pinned provenance | Verified | Captured commit, tree and per-file hashes recorded below |
| Interface documentation | Partially verified | Source inspection only; run clean-checkout quickstart |
| Runtime behavior | Unverified | No repository execution in this review |
| Test results | Unverified | Existing tests were not run |
| Deployment / package availability | Unverified | No remote publish or live-service check |
| Visual / link checks | Unverified | Portfolio renderer and independent QA are separate from this authoring step |

## Unresolved issues

Search results vary by location, time and actor behavior. Apify calls can incur usage; this script does not schedule itself or guarantee live daily runs. No current SERP was fetched for this review.

## Captured source inventory

This lists captured provenance, not a claim that every line received a full audit. Binary/generated/excluded files are outside the eligible text capture.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [LICENSE](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/LICENSE) | `68729cab364d82364078b08d8580ccfa51dc69c81a7d64e8d8d47a1da6c9349d` | 1072 |
| [README.md](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/README.md) | `6bbe8539723476153d3a83768952f975f0d4b0c0bedbf9be8f185fc23c67f3ce` | 1653 |
| [package.json](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/package.json) | `2683d0fb28687a99edbb194317c1d21a8c0798d9058e07c9e1bd89cf3192e41f` | 532 |
| [.github/workflows/ci.yml](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/.github/workflows/ci.yml) | `e818f4e6bd805f798665dbbf04964d02f12fc59dd7f18903ad63d26d374ae3f0` | 380 |
| [render.yaml](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/render.yaml) | `f5100999836a497d221d31f25b5ead19cfc874fb8a439653c00ba67c2974cf94` | 425 |
| [src/index.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/src/index.js) | `c14e25472efce5fea4e8df3ad344bdaa555863ef2c14568eb7b3d5bdfc62fcb7` | 11007 |
| [test/smoke.test.js](https://github.com/NickCirv/daily-seo-rank-tracker/blob/389d69a4fa96613853306540f10577f3050f64ce/test/smoke.test.js) | `6aa845b629abc98c8f85c55f9586d2d142ad7728c4a916b97fbf371dfde0f92d` | 252 |
